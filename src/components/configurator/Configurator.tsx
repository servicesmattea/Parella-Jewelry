"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { stones } from "@/data/stones";
import type { SlotValue } from "./BraceletScene";
import { Check, Loader2, RotateCcw, ShoppingBag } from "lucide-react";
import Reveal from "../Reveal";
import Magnetic from "../MagneticButton";
import { useCart } from "@/context/CartContext";

const BraceletScene = dynamic(() => import("./BraceletScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-[var(--color-beige-dark)]">
      <Loader2 className="animate-spin" size={28} />
    </div>
  ),
});

const MIN_STONE_CM = 0.5;
const MAX_STONE_CM = 1;
const STONE_PRICE = 0.5;
const BASE_PRICE = 25;

type JewelryTypeKey = "bracelet" | "collier" | "chaine-de-pied";

const JEWELRY_TYPES: Record<
  JewelryTypeKey,
  { label: string; sizes: number[]; defaultSize: number; baseName: string }
> = {
  bracelet: {
    label: "Bracelet",
    sizes: [15, 16, 17, 18, 19, 20],
    defaultSize: 17,
    baseName: "Bracelet personnalisé",
  },
  collier: {
    label: "Collier",
    sizes: [40, 42, 45, 50],
    defaultSize: 45,
    baseName: "Collier personnalisé",
  },
  "chaine-de-pied": {
    label: "Chaîne de pied",
    sizes: [22, 23, 24, 25],
    defaultSize: 23,
    baseName: "Chaîne de pied personnalisée",
  },
};

function computeBounds(sizeCm: number) {
  const maxStones = Math.floor(sizeCm / MIN_STONE_CM);
  const minStones = Math.ceil(sizeCm / MAX_STONE_CM);
  return { maxStones, minStones };
}

function resizeSlots(slots: SlotValue[], count: number): SlotValue[] {
  if (count === slots.length) return slots;
  if (count < slots.length) return slots.slice(0, count);
  return [...slots, ...Array.from({ length: count - slots.length }, () => null)];
}

export default function Configurator({ editId }: { editId?: string } = {}) {
  const [jewelryType, setJewelryType] = useState<JewelryTypeKey>("bracelet");
  const [sizeCm, setSizeCm] = useState(JEWELRY_TYPES.bracelet.defaultSize);

  const { minStones, maxStones } = useMemo(() => computeBounds(sizeCm), [sizeCm]);

  const [stoneCount, setStoneCount] = useState(minStones);
  const [slots, setSlots] = useState<SlotValue[]>(
    Array.from({ length: minStones }, () => null)
  );
  const [activeSlot, setActiveSlot] = useState(0);
  const [added, setAdded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const cart = useCart();

  useEffect(() => {
    if (!editId || editingId) return;
    const item = cart.items.find(
      (i) => i.id === editId && i.kind === "custom" && i.customConfig
    );
    if (!item?.customConfig) return;
    const config = item.customConfig;
    const type = (config.jewelryType ?? "bracelet") as JewelryTypeKey;
    const size = config.sizeCm ?? JEWELRY_TYPES[type].defaultSize;
    setJewelryType(type);
    setSizeCm(size);
    setSlots(config.slots);
    setStoneCount(config.slots.length);
    setActiveSlot(0);
    setEditingId(editId);
  }, [editId, editingId, cart.items]);

  function handleTypeChange(type: JewelryTypeKey) {
    setJewelryType(type);
    const newSize = JEWELRY_TYPES[type].defaultSize;
    setSizeCm(newSize);
    const { minStones: newMin } = computeBounds(newSize);
    setStoneCount(newMin);
    setSlots(Array.from({ length: newMin }, () => null));
    setActiveSlot(0);
  }

  function handleSizeChange(size: number) {
    setSizeCm(size);
    const { minStones: newMin } = computeBounds(size);
    const newCount = Math.max(newMin, Math.min(stoneCount, Math.floor(size / MIN_STONE_CM)));
    setStoneCount(newCount);
    setSlots((prev) => resizeSlots(prev, newCount));
    setActiveSlot((i) => Math.min(i, newCount - 1));
  }

  const beadDiameterCm = sizeCm / stoneCount;

  const filledCount = slots.filter(Boolean).length;
  const extraStones = Math.max(0, filledCount - minStones);
  const price = useMemo(() => BASE_PRICE + extraStones * STONE_PRICE, [extraStones]);

  function changeStoneCount(count: number) {
    setStoneCount(count);
    setSlots((prev) => resizeSlots(prev, count));
    setActiveSlot((i) => Math.min(i, count - 1));
  }

  function assignStone(hex: string, name: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[activeSlot] = { hex, name };
      return next;
    });
    setActiveSlot((i) => (i + 1) % stoneCount);
  }

  function reset() {
    setSlots(Array.from({ length: stoneCount }, () => null));
    setActiveSlot(0);
  }

  function handleAddToCart() {
    const firstStone = slots.find((s) => s !== null);
    const typeLabel = JEWELRY_TYPES[jewelryType].baseName;
    const item = {
      id: editingId ?? `custom-${Date.now()}`,
      name: `${typeLabel} (${sizeCm} cm · ${filledCount} pierres)`,
      price,
      hex: firstStone?.hex ?? "#B9A17E",
      kind: "custom" as const,
      customConfig: { slots, jewelryType, sizeCm },
    };
    if (editingId) {
      cart.update(editingId, item);
    } else {
      cart.add(item);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const typeKeys = Object.keys(JEWELRY_TYPES) as JewelryTypeKey[];

  return (
    <section
      id="configurateur"
      className="bg-[var(--color-sand)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
            Atelier de création
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
            {editingId ? "Modifiez votre création" : "Créez le bijou qui vous ressemble"}
          </h2>
          <p className="text-sm text-[var(--color-beige-dark)] mt-4">
            Cliquez sur une perle puis choisissez sa pierre dans la palette.
            Votre création s&apos;affiche en temps réel.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-start">
          {/* 3D canvas — ivory background */}
          <div className="relative rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3.4] shadow-soft border border-[var(--color-beige)]/30"
               style={{ background: "#faf7f2" }}>
            <BraceletScene
              slots={slots}
              activeSlot={activeSlot}
              beadDiameterCm={beadDiameterCm}
              onSelectSlot={setActiveSlot}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[var(--color-beige-dark)] text-xs pointer-events-none">
              <span>Glissez pour faire pivoter</span>
              <button
                onClick={reset}
                className="pointer-events-auto inline-flex items-center gap-1.5 text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors"
              >
                <RotateCcw size={13} /> Réinitialiser
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8">
            {/* Type selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-[var(--color-beige-darker)] mb-3">
                Type de bijou
              </p>
              <div className="flex gap-2">
                {typeKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleTypeChange(key)}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-semibold border-2 transition-colors ${
                      jewelryType === key
                        ? "border-[var(--color-electric)] bg-[var(--color-electric)] text-white"
                        : "border-[var(--color-beige)]/40 text-[var(--color-beige-darker)] hover:border-[var(--color-electric)]"
                    }`}
                  >
                    {JEWELRY_TYPES[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-[var(--color-beige-darker)] mb-3">
                Taille
              </p>
              <div className="flex flex-wrap gap-2">
                {JEWELRY_TYPES[jewelryType].sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`min-w-[52px] py-2 px-3 rounded-full text-xs font-semibold border-2 transition-colors ${
                      sizeCm === size
                        ? "border-[var(--color-electric)] bg-[var(--color-electric)] text-white"
                        : "border-[var(--color-beige)]/40 text-[var(--color-beige-darker)] hover:border-[var(--color-electric)]"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl text-[var(--color-beige-darker)]">
                Vos perles ({filledCount}/{stoneCount})
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="stone-count"
                  className="text-sm font-semibold text-[var(--color-beige-darker)]"
                >
                  Nombre de perles
                </label>
                <span className="text-xs text-[var(--color-beige-dark)]">
                  {stoneCount} perles &middot; {beadDiameterCm.toFixed(2)} cm / perle
                </span>
              </div>
              <input
                id="stone-count"
                type="range"
                min={minStones}
                max={maxStones}
                value={stoneCount}
                onChange={(e) => changeStoneCount(Number(e.target.value))}
                className="w-full accent-[var(--color-electric)]"
              />
              <div className="flex justify-between text-[10px] text-[var(--color-beige-dark)] mt-1">
                <span>{minStones} (pierres ~1 cm)</span>
                <span>{maxStones} (pierres ~0.5 cm)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-7 max-h-32 overflow-y-auto pr-1">
              {slots.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlot(i)}
                  aria-label={`Sélectionner la perle ${i + 1}`}
                  className={`w-[22px] h-[22px] rounded-full border-2 transition-all ${
                    activeSlot === i
                      ? "border-[var(--color-electric)] scale-125"
                      : "border-[var(--color-beige)]/40"
                  }`}
                  style={{ background: s ? s.hex : "#F1ECE3" }}
                />
              ))}
            </div>

            <h4 className="text-sm font-semibold text-[var(--color-beige-darker)] mb-3">
              Choisissez une pierre pour la perle n°{activeSlot + 1}
            </h4>
            <div className="grid grid-cols-5 gap-3 mb-7">
              {stones.map((stone) => (
                <button
                  key={stone.id}
                  onClick={() => assignStone(stone.hex, stone.name)}
                  title={stone.name}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-[var(--color-electric)] transition-all shadow-sm"
                    style={{ background: stone.hex }}
                  />
                  <span className="text-[10px] text-[var(--color-beige-dark)] text-center leading-tight">
                    {stone.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--color-beige)]/30 pt-6">
              <div>
                <p className="text-xs text-[var(--color-beige-dark)]">Prix total</p>
                <p className="font-display text-2xl text-[var(--color-beige-darker)]">
                  {price.toFixed(2)} €
                </p>
              </div>
              <Magnetic>
                <button
                  onClick={handleAddToCart}
                  disabled={filledCount === 0}
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-6 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {added ? (
                    <>
                      <Check size={16} /> {editingId ? "Mis à jour" : "Ajouté"}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />{" "}
                      {editingId ? "Mettre à jour" : "Ajouter au panier"}
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
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

const MAX_STONES = 45;
const MIN_STONE_CM = 0.5;
const MAX_STONE_CM = 1;
// Fixed physical bracelet length: the smallest stones (0.5cm) are what let
// 45 of them fit around the wrist, so that sets the bracelet's circumference.
const BRACELET_LENGTH_CM = MAX_STONES * MIN_STONE_CM;
// Fewer, bigger stones can't be smaller than MAX_STONE_CM each, which sets
// the floor on how few stones can still fill the bracelet.
const MIN_STONES = Math.ceil(BRACELET_LENGTH_CM / MAX_STONE_CM);

const STONE_PRICE = 0.5;
const BASE_PRICE = 25;

function resizeSlots(slots: SlotValue[], count: number): SlotValue[] {
  if (count === slots.length) return slots;
  if (count < slots.length) return slots.slice(0, count);
  return [...slots, ...Array.from({ length: count - slots.length }, () => null)];
}

export default function Configurator() {
  const [stoneCount, setStoneCount] = useState(MAX_STONES);
  const [slots, setSlots] = useState<SlotValue[]>(
    Array.from({ length: MAX_STONES }, () => null)
  );
  const [activeSlot, setActiveSlot] = useState(0);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const beadDiameterCm = BRACELET_LENGTH_CM / stoneCount;

  const filledCount = slots.filter(Boolean).length;
  const extraStones = Math.max(0, filledCount - MIN_STONES);
  const price = useMemo(
    () => BASE_PRICE + extraStones * STONE_PRICE,
    [extraStones]
  );

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
    cart.add({
      id: `custom-${Date.now()}`,
      name: `Bracelet personnalisé (${filledCount} pierres)`,
      price,
      hex: firstStone?.hex ?? "#B9A17E",
      kind: "custom",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section
      id="configurateur"
      className="bg-[var(--color-ink)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric-light)]">
            Configurateur 3D
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white mt-3">
            Créez le bracelet qui vous ressemble
          </h2>
          <p className="text-sm text-white/70 mt-4">
            Faites pivoter le bracelet, cliquez sur une perle puis choisissez
            sa pierre dans la palette. Votre création s&apos;affiche en temps
            réel, en 3D.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-start">
          <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 aspect-square sm:aspect-[4/3.4] overflow-hidden">
            <BraceletScene
              slots={slots}
              activeSlot={activeSlot}
              beadDiameterCm={beadDiameterCm}
              onSelectSlot={setActiveSlot}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/60 text-xs pointer-events-none">
              <span>Glissez pour faire pivoter</span>
              <button
                onClick={reset}
                className="pointer-events-auto inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              >
                <RotateCcw size={13} /> Réinitialiser
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
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
                min={MIN_STONES}
                max={MAX_STONES}
                value={stoneCount}
                onChange={(e) => changeStoneCount(Number(e.target.value))}
                className="w-full accent-[var(--color-electric)]"
              />
              <div className="flex justify-between text-[10px] text-[var(--color-beige-dark)] mt-1">
                <span>{MIN_STONES} (pierres ~1 cm)</span>
                <span>{MAX_STONES} (pierres ~0.5 cm)</span>
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

            <div className="flex items-center gap-2.5 mb-8 text-xs text-[var(--color-beige-dark)] bg-[var(--color-cream)] rounded-xl px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-white ring-1 ring-[var(--color-beige)]/50 shrink-0" />
              Fil élastique transparent, résistant et invisible — il met en
              valeur uniquement vos pierres.
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
                      <Check size={16} /> Ajouté
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Ajouter au panier
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

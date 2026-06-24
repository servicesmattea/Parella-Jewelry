"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight, Gem, Minus, Plus, ShieldAlert, ShoppingBag, Sparkles } from "lucide-react";
import type { Bracelet } from "@/data/bracelets";
import { getBraceletStoneHex } from "@/data/bracelets";
import { categoryLabels, type Stone } from "@/data/stones";
import BraceletCard from "@/components/BraceletCard";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/MagneticButton";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({
  bracelet,
  braceletStones,
  related,
}: {
  bracelet: Bracelet;
  braceletStones: Stone[];
  related: Bracelet[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const cart = useCart();

  function handleAddToCart() {
    cart.add(
      { id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: getBraceletStoneHex(bracelet), kind: "bracelet" },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const categories = Array.from(new Set(braceletStones.map((s) => categoryLabels[s.category].toLowerCase())));
  const cautions = braceletStones.filter((s) => s.caution);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-beige-dark)]">
          <Link href="/" className="hover:text-[var(--color-electric)]">Accueil</Link>
          <ChevronRight size={12} />
          <Link href="/bracelets" className="hover:text-[var(--color-electric)]">Bracelets</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-beige-darker)]">{bracelet.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <Reveal>
          <div className="relative aspect-square rounded-3xl bg-[var(--color-cream)] overflow-hidden shadow-lifted">
            {bracelet.badge && (
              <span className="absolute top-5 left-5 z-10 bg-white/80 backdrop-blur text-[var(--color-beige-darker)] text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                {bracelet.badge}
              </span>
            )}
            <Image
              src={bracelet.images[activeImage]}
              alt={bracelet.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          {bracelet.images.length > 1 && (
            <div className="flex gap-2.5 mt-4">
              {bracelet.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Photo ${i + 1} de ${bracelet.name}`}
                  aria-pressed={i === activeImage}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    i === activeImage
                      ? "border-[var(--color-electric)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)]">
            {bracelet.name}
          </h1>
          <p className="font-display text-2xl text-[var(--color-electric)] mt-3">
            {bracelet.price.toFixed(2)} €
          </p>
          <p className="text-[var(--color-beige-dark)] mt-5 leading-relaxed">
            {bracelet.story}
          </p>

          <div className="flex items-center gap-2.5 mt-6 text-xs text-[var(--color-beige-dark)] bg-[var(--color-cream)] rounded-xl px-4 py-3">
            <Sparkles size={14} className="text-[var(--color-electric)] shrink-0" />
            {bracelet.beadCount} {categories.join(" & ")} · fil élastique transparent
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-[var(--color-beige)]/40 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuer la quantité"
                className="w-11 h-11 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)]"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center text-sm font-medium text-[var(--color-beige-darker)]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                aria-label="Augmenter la quantité"
                className="w-11 h-11 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)]"
              >
                <Plus size={15} />
              </button>
            </div>

            <Magnetic className="flex-1">
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center gap-2 min-h-11 px-6 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? "Ajouté au panier" : "Ajouter au panier"}
              </button>
            </Magnetic>
          </div>

          {braceletStones.map((stone) => (
            <Link
              key={stone.id}
              href={`/pierres?pierre=${stone.id}`}
              className="mt-4 flex items-start gap-4 rounded-2xl border border-[var(--color-beige)]/30 p-5 hover:border-[var(--color-electric)] transition-colors"
            >
              {stone.photo ? (
                <span className="relative w-12 h-12 rounded-full shrink-0 ring-2 ring-white shadow-sm mt-0.5 overflow-hidden">
                  <Image src={stone.photo} alt="" fill sizes="48px" className="object-cover" />
                </span>
              ) : (
                <span
                  className="w-12 h-12 rounded-full shrink-0 ring-2 ring-white shadow-sm mt-0.5"
                  style={{ background: stone.hex }}
                />
              )}
              <span>
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-electric)]">
                  <Gem size={13} /> {stone.name}
                </span>
                <span className="block text-sm text-[var(--color-beige-dark)] mt-1.5 leading-relaxed">
                  {stone.meaning}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-beige-darker)] mt-2">
                  Découvrir sa signification complète <ChevronRight size={12} />
                </span>
              </span>
            </Link>
          ))}

          {(cautions.length > 0 || bracelet.caution) && (
            <div className="flex items-start gap-2.5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-3">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <div className="space-y-2">
                {bracelet.caution && <p>{bracelet.caution}</p>}
                {cautions.map((s) => (
                  <p key={s.id}>{s.caution}</p>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[var(--color-beige)]/20">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-beige-darker)] mb-10">
            Vous aimerez aussi
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
          {related.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <BraceletCard bracelet={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

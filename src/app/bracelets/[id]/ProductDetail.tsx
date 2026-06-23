"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight, Gem, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import type { Bracelet } from "@/data/bracelets";
import type { Stone } from "@/data/stones";
import { BeadStrand } from "@/components/BraceletCard";
import BraceletCard from "@/components/BraceletCard";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/MagneticButton";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({
  bracelet,
  stone,
  related,
}: {
  bracelet: Bracelet;
  stone?: Stone;
  related: Bracelet[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  function handleAddToCart() {
    cart.add(
      { id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: bracelet.stoneHex, kind: "bracelet" },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

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
          <div className="relative aspect-square rounded-3xl bg-[var(--color-ink)] overflow-hidden shadow-lifted">
            {bracelet.badge && (
              <span className="absolute top-5 left-5 z-10 bg-white/15 backdrop-blur text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                {bracelet.badge}
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-2/3">
                <BeadStrand
                  hex={bracelet.stoneHex}
                  count={bracelet.beadCount}
                  beadSize={18}
                  strokeColor="rgba(255,255,255,0.35)"
                />
              </div>
            </div>
          </div>
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
            {bracelet.beadCount} pierres naturelles · fil élastique transparent
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

          {stone && (
            <Link
              href={`/pierres?pierre=${stone.id}`}
              className="mt-8 flex items-start gap-4 rounded-2xl border border-[var(--color-beige)]/30 p-5 hover:border-[var(--color-electric)] transition-colors"
            >
              <span
                className="w-12 h-12 rounded-full shrink-0 ring-2 ring-white shadow-sm mt-0.5"
                style={{ background: stone.hex }}
              />
              <span>
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-electric)]">
                  <Gem size={13} /> La pierre : {stone.name}
                </span>
                <span className="block text-sm text-[var(--color-beige-dark)] mt-1.5 leading-relaxed">
                  {stone.meaning}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-beige-darker)] mt-2">
                  Découvrir sa signification complète <ChevronRight size={12} />
                </span>
              </span>
            </Link>
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

"use client";

import { Check, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Bracelet } from "@/data/bracelets";
import { getBraceletStoneHex } from "@/data/bracelets";
import TiltCard from "./TiltCard";
import { useCart } from "@/context/CartContext";

function useAddedFeedback() {
  const [added, setAdded] = useState(false);
  function trigger() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }
  return [added, trigger] as const;
}

export default function BraceletCard({ bracelet }: { bracelet: Bracelet }) {
  const [added, trigger] = useAddedFeedback();
  const cart = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.add({ id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: getBraceletStoneHex(bracelet), kind: "bracelet" });
    trigger();
  }

  return (
    <div className="group">
      <Link href={`/bracelets/${bracelet.id}`} className="block">
        <TiltCard max={4} className="relative aspect-square rounded-2xl bg-[var(--color-cream)] overflow-hidden shadow-soft">
          {bracelet.badge && (
            <span className="absolute top-3 left-3 z-10 bg-[var(--color-beige-darker)] text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
              {bracelet.badge}
            </span>
          )}
          <Image
            src={bracelet.images[0]}
            alt={bracelet.name}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </TiltCard>
      </Link>

      <div className="mt-4">
        <Link href={`/bracelets/${bracelet.id}`} className="block">
          <h3 className="font-display text-lg text-[var(--color-beige-darker)]">
            {bracelet.name}
          </h3>
          <p className="text-sm text-[var(--color-beige-dark)] mt-0.5">{bracelet.description}</p>
          <p className="text-xs text-[var(--color-electric)] mt-1.5 font-medium">{bracelet.energy}</p>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-semibold text-[var(--color-beige-darker)]">{bracelet.price.toFixed(2)} €</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/bracelets/${bracelet.id}`}
              className="text-xs font-semibold text-[var(--color-electric)] hover:text-[var(--color-electric-dark)] transition-colors"
            >
              Découvrir →
            </Link>
            <button
              onClick={handleAddToCart}
              aria-label={`Ajouter ${bracelet.name} au panier`}
              className="w-9 h-9 shrink-0 rounded-full bg-[var(--color-beige-darker)] text-white flex items-center justify-center hover:bg-[var(--color-electric)] transition-colors"
            >
              {added ? <Check size={14} /> : <ShoppingBag size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedBracelet({ bracelet }: { bracelet: Bracelet }) {
  const [added, trigger] = useAddedFeedback();
  const cart = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.add({ id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: getBraceletStoneHex(bracelet), kind: "bracelet" });
    trigger();
  }

  return (
    <Link href={`/bracelets/${bracelet.id}`} className="block h-full">
      <TiltCard
        max={3}
        className="relative h-full min-h-[26rem] rounded-3xl bg-[var(--color-ink)] overflow-hidden p-8 sm:p-10 flex flex-col shadow-lifted"
      >
        <Image
          src={bracelet.images[0]}
          alt={bracelet.name}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
        <div className="relative flex items-start justify-between">
          {bracelet.badge && (
            <span className="bg-white/15 backdrop-blur text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
              {bracelet.badge}
            </span>
          )}
        </div>

        <div className="relative flex-1 my-6" />

        <div className="relative">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{bracelet.energy}</p>
          <h3 className="font-display text-3xl sm:text-4xl text-white">{bracelet.name}</h3>
          <p className="text-white/70 mt-1">{bracelet.description}</p>
          <div className="mt-6 flex items-center justify-between">
            <p className="font-display text-2xl text-white">{bracelet.price.toFixed(2)} €</p>
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-3 rounded-full bg-white text-[var(--color-beige-darker)] text-sm font-semibold hover:bg-[var(--color-electric)] hover:text-white transition-colors"
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              {added ? "Ajouté" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}

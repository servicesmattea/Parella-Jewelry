"use client";

import { Check, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Bracelet } from "@/data/bracelets";
import StoneBead2D from "./StoneBead2D";
import TiltCard from "./TiltCard";
import { beadPathPoint } from "@/lib/beadPath";
import { useCart } from "@/context/CartContext";

function useBeadPath(count: number) {
  return useMemo(
    () => Array.from({ length: count }, (_, i) => beadPathPoint(i / (count - 1))),
    [count]
  );
}

export function BeadStrand({
  hex,
  count,
  beadSize,
  strokeColor = "rgba(180,190,200,0.55)",
}: {
  hex: string;
  count: number;
  beadSize: number;
  strokeColor?: string;
}) {
  const points = useBeadPath(count);
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polyline points={polylinePoints} fill="none" stroke={strokeColor} strokeWidth={0.6} />
      </svg>
      {points.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <StoneBead2D hex={hex} index={i} size={beadSize} />
        </span>
      ))}
    </>
  );
}

function useAddedFeedback() {
  const [added, setAdded] = useState(false);
  function trigger() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }
  return [added, trigger] as const;
}

export default function BraceletCard({ bracelet }: { bracelet: Bracelet }) {
  const [liked, setLiked] = useState(false);
  const [added, trigger] = useAddedFeedback();
  const cart = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.add({ id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: bracelet.stoneHex, kind: "bracelet" });
    trigger();
  }

  return (
    <div className="group">
      <Link href={`/bracelets/${bracelet.id}`} className="block">
        <TiltCard max={4} className="relative aspect-square rounded-2xl bg-[var(--color-cream)] overflow-hidden flex items-center justify-center shadow-soft">
          {bracelet.badge && (
            <span className="absolute top-3 left-3 z-10 bg-[var(--color-beige-darker)] text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
              {bracelet.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            aria-label="Ajouter aux favoris"
            className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors"
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-[var(--color-electric)]" : ""} />
          </button>

          <div className="relative w-[88%] h-[60%] group-hover:scale-105 transition-transform">
            <BeadStrand hex={bracelet.stoneHex} count={bracelet.beadCount} beadSize={9} />
          </div>
        </TiltCard>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <Link href={`/bracelets/${bracelet.id}`} className="block">
          <h3 className="font-display text-lg text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors">
            {bracelet.name}
          </h3>
          <p className="text-sm text-[var(--color-beige-dark)] mt-0.5">{bracelet.description}</p>
          <p className="text-xs text-[var(--color-beige-dark)]/80 mt-0.5">{bracelet.beadCount} perles naturelles</p>
        </Link>
        <button
          onClick={handleAddToCart}
          aria-label={`Ajouter ${bracelet.name} au panier`}
          className="mt-1 w-11 h-11 shrink-0 rounded-full bg-[var(--color-beige-darker)] text-white flex items-center justify-center hover:bg-[var(--color-electric)] transition-colors"
        >
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
        </button>
      </div>
      <p className="mt-2 font-semibold text-[var(--color-electric)]">{bracelet.price.toFixed(2)} €</p>
    </div>
  );
}

export function FeaturedBracelet({ bracelet }: { bracelet: Bracelet }) {
  const [liked, setLiked] = useState(false);
  const [added, trigger] = useAddedFeedback();
  const cart = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.add({ id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: bracelet.stoneHex, kind: "bracelet" });
    trigger();
  }

  return (
    <Link href={`/bracelets/${bracelet.id}`} className="block h-full">
      <TiltCard
        max={3}
        className="relative h-full min-h-[26rem] rounded-3xl bg-[var(--color-ink)] overflow-hidden p-8 sm:p-10 flex flex-col shadow-lifted"
      >
        <div className="flex items-start justify-between">
          {bracelet.badge && (
            <span className="bg-white/15 backdrop-blur text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
              {bracelet.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            aria-label="Ajouter aux favoris"
            className="w-11 h-11 -mt-2 -mr-2 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-[var(--color-electric-light)] transition-colors ml-auto"
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="relative flex-1 my-6">
          <BeadStrand
            hex={bracelet.stoneHex}
            count={bracelet.beadCount}
            beadSize={15}
            strokeColor="rgba(255,255,255,0.35)"
          />
        </div>

        <div>
          <h3 className="font-display text-3xl sm:text-4xl text-white">{bracelet.name}</h3>
          <p className="text-white/70 mt-2 max-w-sm">{bracelet.description}</p>
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

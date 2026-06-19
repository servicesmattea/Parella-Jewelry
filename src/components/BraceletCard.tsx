"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { Bracelet } from "@/data/bracelets";
import StoneBead2D from "./StoneBead2D";

function useBeadPath(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const x = 6 + t * 88;
      const y = 50 + Math.sin(t * Math.PI * 2.3) * 22;
      return { x, y };
    });
  }, [count]);
}

export default function BraceletCard({ bracelet }: { bracelet: Bracelet }) {
  const [liked, setLiked] = useState(false);
  const points = useBeadPath(bracelet.beadCount);
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="group">
      <div className="relative aspect-square rounded-2xl bg-[var(--color-cream)] overflow-hidden flex items-center justify-center">
        {bracelet.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[var(--color-beige-darker)] text-white text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
            {bracelet.badge}
          </span>
        )}
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Ajouter aux favoris"
          className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-[var(--color-electric)]" : ""} />
        </button>

        <div className="relative w-[88%] h-[60%] group-hover:scale-105 transition-transform">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="rgba(180,190,200,0.55)"
              strokeWidth={0.6}
            />
          </svg>
          {points.map((p, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <StoneBead2D hex={bracelet.stoneHex} index={i} size={9} />
            </span>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 transition-colors" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-[var(--color-beige-darker)]">{bracelet.name}</h3>
          <p className="text-sm text-[var(--color-beige-dark)] mt-0.5">{bracelet.description}</p>
          <p className="text-xs text-[var(--color-beige-dark)]/80 mt-0.5">{bracelet.beadCount} perles naturelles</p>
        </div>
        <button
          aria-label={`Ajouter ${bracelet.name} au panier`}
          className="mt-1 w-11 h-11 shrink-0 rounded-full bg-[var(--color-beige-darker)] text-white flex items-center justify-center hover:bg-[var(--color-electric)] transition-colors"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
      <p className="mt-2 font-semibold text-[var(--color-electric)]">{bracelet.price.toFixed(2)} €</p>
    </div>
  );
}

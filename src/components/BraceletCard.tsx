"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Bracelet } from "@/data/bracelets";

export default function BraceletCard({ bracelet }: { bracelet: Bracelet }) {
  const [liked, setLiked] = useState(false);

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
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-[var(--color-electric)]" : ""} />
        </button>

        <div className="relative w-2/3 h-2 rounded-full bg-[linear-gradient(90deg,#d8c7a8,#c2a36f)] flex items-center justify-between px-1 group-hover:scale-105 transition-transform">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full ring-2 ring-white shadow"
              style={{ background: bracelet.stoneHex }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 transition-colors" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-[var(--color-beige-darker)]">{bracelet.name}</h3>
          <p className="text-sm text-[var(--color-beige-dark)] mt-0.5">{bracelet.description}</p>
          <p className="text-xs text-[var(--color-beige-dark)]/80 mt-0.5">{bracelet.metal}</p>
        </div>
        <button
          aria-label={`Ajouter ${bracelet.name} au panier`}
          className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[var(--color-beige-darker)] text-white flex items-center justify-center hover:bg-[var(--color-electric)] transition-colors"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
      <p className="mt-2 font-semibold text-[var(--color-electric)]">{bracelet.price.toFixed(2)} €</p>
    </div>
  );
}

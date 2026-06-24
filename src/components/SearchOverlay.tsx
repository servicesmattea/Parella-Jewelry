"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { bracelets, getBraceletStoneHex } from "@/data/bracelets";
import { stones } from "@/data/stones";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const braceletResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bracelets.slice(0, 4);
    return bracelets.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
  }, [query]);

  const stoneResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return stones.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[var(--color-ink)]/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-24 w-[92%] max-w-xl bg-white rounded-2xl shadow-lifted overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-beige)]/30">
          <Search size={18} className="text-[var(--color-beige-dark)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un bracelet, une pierre..."
            className="flex-1 text-sm outline-none text-[var(--color-beige-darker)] placeholder:text-[var(--color-beige-dark)]/60"
          />
          <button
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="w-9 h-9 flex items-center justify-center text-[var(--color-beige-dark)] hover:text-[var(--color-electric)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3">
          {braceletResults.length === 0 && stoneResults.length === 0 && (
            <p className="text-sm text-[var(--color-beige-dark)] text-center py-8">
              Aucun résultat pour &laquo;{query}&raquo;.
            </p>
          )}

          {braceletResults.length > 0 && (
            <div className="mb-2">
              <p className="text-[11px] uppercase tracking-wide text-[var(--color-beige-dark)] px-3 py-2">
                Bracelets
              </p>
              {braceletResults.map((b) => (
                <Link
                  key={b.id}
                  href={`/bracelets/${b.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-cream)] transition-colors"
                >
                  <span
                    className="w-9 h-9 rounded-full shrink-0"
                    style={{ background: getBraceletStoneHex(b) }}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-[var(--color-beige-darker)]">
                      {b.name}
                    </span>
                    <span className="block text-xs text-[var(--color-beige-dark)]">
                      {b.description}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-electric)]">
                    {b.price.toFixed(2)} €
                  </span>
                </Link>
              ))}
            </div>
          )}

          {stoneResults.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--color-beige-dark)] px-3 py-2">
                Pierres
              </p>
              {stoneResults.map((s) => (
                <Link
                  key={s.id}
                  href={`/pierres?pierre=${s.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-cream)] transition-colors"
                >
                  <span className="w-9 h-9 rounded-full shrink-0" style={{ background: s.hex }} />
                  <span className="text-sm font-medium text-[var(--color-beige-darker)]">
                    {s.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

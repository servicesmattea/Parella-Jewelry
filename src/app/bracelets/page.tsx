"use client";

import { useMemo, useState } from "react";
import { bracelets } from "@/data/bracelets";
import BraceletCard from "@/components/BraceletCard";
import Reveal from "@/components/Reveal";

const SORTS = {
  signature: "Notre sélection",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
} as const;

type SortKey = keyof typeof SORTS;

export default function BraceletsPage() {
  const [sort, setSort] = useState<SortKey>("signature");

  const sorted = useMemo(() => {
    const list = [...bracelets];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Collection Parella Atelier
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-3">
              Les bracelets Parella
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-beige-dark)] mt-4 max-w-xl">
              Des bracelets en pierres naturelles réalisés à la main, imaginés
              pour être portés seuls, associés ou offerts.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-10">
          <p className="text-sm text-[var(--color-beige-dark)]">
            {sorted.length} créations
          </p>
          <label className="flex items-center gap-2 text-sm text-[var(--color-beige-darker)]">
            Trier par
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-[var(--color-beige)]/40 rounded-full px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]"
            >
              {Object.entries(SORTS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
          {sorted.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 0.06}>
              <BraceletCard bracelet={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

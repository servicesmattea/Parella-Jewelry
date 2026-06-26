"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { bracelets } from "@/data/bracelets";
import BraceletCard from "@/components/BraceletCard";
import Reveal from "@/components/Reveal";

const SORTS = {
  signature: "Notre sélection",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
} as const;

type SortKey = keyof typeof SORTS;

const ENERGY_COLORS: Record<string, string> = {
  Confiance: "#B6792A",
  Amour: "#E7B9C4",
  Sérénité: "#8E6BBF",
  Protection: "#3D3D40",
  Énergie: "#C1602E",
  Chance: "#5E9E78",
};

function BraceletsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const energieFilter = searchParams.get("energie");

  const [sort, setSort] = useState<SortKey>("signature");

  const filtered = useMemo(() => {
    let list = [...bracelets];
    if (energieFilter) {
      list = list.filter((b) =>
        b.energy.toLowerCase().includes(energieFilter.toLowerCase())
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort, energieFilter]);

  const energyColor = energieFilter ? ENERGY_COLORS[energieFilter] : null;

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Collection Parella Atelier
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-3">
              {energieFilter
                ? `Bracelets — ${energieFilter}`
                : "Les bracelets Parella"}
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-beige-dark)] mt-4 max-w-xl">
              {energieFilter
                ? `Des créations choisies pour l'énergie de ${energieFilter.toLowerCase()} qu'elles évoquent.`
                : "Des bracelets en pierres naturelles réalisés à la main, imaginés pour être portés seuls, associés ou offerts."}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <p className="text-sm text-[var(--color-beige-dark)]">
              {filtered.length} création{filtered.length > 1 ? "s" : ""}
            </p>
            {energieFilter && (
              <button
                onClick={() => router.push("/bracelets")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                style={{
                  color: energyColor ?? "var(--color-electric)",
                  borderColor: energyColor ?? "var(--color-electric)",
                  background: energyColor ? `${energyColor}18` : "transparent",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: energyColor ?? "var(--color-electric)" }}
                />
                {energieFilter}
                <X size={12} />
              </button>
            )}
          </div>
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

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-beige-dark)]">
            <p className="text-lg font-display mb-4">Aucune création trouvée</p>
            <button
              onClick={() => router.push("/bracelets")}
              className="text-sm underline underline-offset-4 hover:text-[var(--color-electric)]"
            >
              Voir toute la collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
            {filtered.map((b, i) => (
              <Reveal key={b.id} delay={(i % 3) * 0.06}>
                <BraceletCard bracelet={b} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BraceletsPage() {
  return (
    <Suspense>
      <BraceletsContent />
    </Suspense>
  );
}

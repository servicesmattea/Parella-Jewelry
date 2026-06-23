"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stones } from "@/data/stones";
import { Gem, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export default function StoneGuide({
  initialStoneId,
  showHeading = true,
}: {
  initialStoneId?: string;
  showHeading?: boolean;
}) {
  const [activeId, setActiveId] = useState(
    stones.some((s) => s.id === initialStoneId) ? initialStoneId! : stones[0].id
  );
  const active = stones.find((s) => s.id === activeId) ?? stones[0];

  return (
    <section id="pierres" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {showHeading && (
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
            Le langage des pierres
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
            Chaque pierre porte une signification
          </h2>
          <p className="text-sm text-[var(--color-beige-dark)] mt-4">
            Faites défiler la liste pour découvrir l&apos;histoire, la
            signification et les bienfaits de chaque pierre naturelle utilisée
            dans nos créations.
          </p>
        </Reveal>
      )}

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-10 px-1 -mx-1">
        {stones.map((stone) => {
          const isActive = stone.id === activeId;
          return (
            <button
              key={stone.id}
              onClick={() => setActiveId(stone.id)}
              aria-pressed={isActive}
              className={`shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2.5 rounded-full border-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "border-[var(--color-electric)] bg-[var(--color-electric)] text-white"
                  : "border-[var(--color-beige)]/40 text-[var(--color-beige-darker)] hover:border-[var(--color-electric)]"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full ring-1 ring-white/60"
                style={{ background: stone.hex }}
              />
              {stone.name}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-center bg-[var(--color-cream)] rounded-3xl p-6 sm:p-10 overflow-hidden">
        <div className="relative aspect-square max-w-sm mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: active.hex }}
              />
              <div className="absolute inset-6 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-inner"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, white 0%, ${active.hex} 35%, ${active.hex} 100%)`,
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-[var(--color-electric)] mb-2">
              <Gem size={18} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                {active.color}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-beige-darker)] mb-4">
              {active.name}
            </h3>
            <p className="text-[var(--color-beige-dark)] leading-relaxed mb-6">
              {active.meaning}
            </p>

            <h4 className="text-sm font-semibold text-[var(--color-beige-darker)] mb-3 flex items-center gap-2">
              <Sparkles size={15} className="text-[var(--color-electric)]" />
              Bienfaits
            </h4>
            <ul className="space-y-2 mb-6">
              {active.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-beige-dark)]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-electric)] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {active.zodiac && (
              <p className="text-xs text-[var(--color-beige-dark)]/80">
                Affinité astrologique :{" "}
                <span className="font-medium text-[var(--color-beige-darker)]">
                  {active.zodiac}
                </span>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

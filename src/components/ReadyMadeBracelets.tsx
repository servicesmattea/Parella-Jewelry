import Link from "next/link";
import { bracelets } from "@/data/bracelets";
import BraceletCard, { FeaturedBracelet } from "./BraceletCard";
import Reveal from "./Reveal";

export default function ReadyMadeBracelets() {
  const [featured, second, third, ...rest] = bracelets;

  return (
    <section id="bracelets" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Collection signature
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
              Bracelets prêts à porter
            </h2>
          </div>
          <p className="text-sm text-[var(--color-beige-dark)] max-w-sm">
            Chaque pièce enfile à la main des perles sélectionnées — pierres
            naturelles, matières naturelles ou décoratives selon le modèle —
            sur un fil élastique transparent, résistant et discret au
            poignet.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <Reveal className="lg:col-span-2">
          <FeaturedBracelet bracelet={featured} />
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          <Reveal delay={0.08}>
            <BraceletCard bracelet={second} />
          </Reveal>
          <Reveal delay={0.16}>
            <BraceletCard bracelet={third} />
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
        {rest.map((b, i) => (
          <Reveal key={b.id} delay={(i % 3) * 0.08}>
            <BraceletCard bracelet={b} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 text-center">
          <Link
            href="/bracelets"
            className="inline-flex items-center justify-center min-h-11 px-8 py-3.5 rounded-full border-2 border-[var(--color-beige-darker)] text-[var(--color-beige-darker)] text-sm font-semibold tracking-wide hover:bg-[var(--color-beige-darker)] hover:text-white transition-colors"
          >
            Voir toute la collection
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

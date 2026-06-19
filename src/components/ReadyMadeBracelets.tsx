import { bracelets } from "@/data/bracelets";
import BraceletCard from "./BraceletCard";

export default function ReadyMadeBracelets() {
  return (
    <section id="bracelets" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
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
          Chaque pièce est assemblée à la main avec des pierres naturelles
          sélectionnées et une chaîne en acier inoxydable plaqué or ou
          argent, garantie sans noircissement.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12">
        {bracelets.map((b) => (
          <BraceletCard key={b.id} bracelet={b} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="#"
          className="inline-block px-8 py-3.5 rounded-full border-2 border-[var(--color-beige-darker)] text-[var(--color-beige-darker)] text-sm font-semibold tracking-wide hover:bg-[var(--color-beige-darker)] hover:text-white transition-colors"
        >
          Voir toute la collection
        </a>
      </div>
    </section>
  );
}

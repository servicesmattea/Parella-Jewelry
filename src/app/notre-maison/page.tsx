import type { Metadata } from "next";
import Link from "next/link";
import Craftsmanship from "@/components/Craftsmanship";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "L'univers Parella — Parella Atelier",
  description:
    "Parella Atelier imagine des bijoux en pierres naturelles réalisés à la main, pensés pour accompagner les périodes importantes, les cadeaux sincères et les élans personnels.",
};

export default function NotreMaisonPage() {
  return (
    <div className="bg-[var(--color-cream)]">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              L&apos;univers Parella
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-4 text-balance">
              Des créations pensées pour{" "}
              <span className="italic text-[var(--color-electric)]">accompagner vos énergies.</span>
            </h1>
            <p className="text-base text-[var(--color-beige-dark)] mt-6 max-w-2xl mx-auto leading-relaxed">
              Chez Parella Atelier, nous croyons qu&apos;un bijou peut faire bien plus qu&apos;habiller un poignet.
              Il peut accompagner une intention, rappeler une force, marquer une étape, transmettre
              une attention ou devenir un porte-bonheur personnel.
            </p>
            <p className="text-base text-[var(--color-beige-dark)] mt-4 max-w-2xl mx-auto leading-relaxed">
              Nos créations sont réalisées à la main, pierre après pierre, à partir de pierres naturelles
              choisies pour leurs couleurs, leurs nuances et les significations qui leur sont associées.
            </p>
          </Reveal>
        </div>
      </div>

      <Craftsmanship showHeading={false} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center border-t border-[var(--color-beige)]/20">
        <Reveal>
          <p className="text-sm text-[var(--color-beige-dark)] italic mb-8 text-balance">
            Parce qu&apos;un bijou peut devenir un rappel de l&apos;énergie que vous souhaitez
            inviter dans votre quotidien.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/bracelets"
              className="inline-flex items-center justify-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
            >
              Découvrir la collection
            </Link>
            <Link
              href="/configurateur"
              className="inline-flex items-center justify-center min-h-11 px-7 py-3.5 rounded-full border-2 border-[var(--color-beige-darker)] text-[var(--color-beige-darker)] text-sm font-semibold hover:bg-[var(--color-beige-darker)] hover:text-white transition-colors"
            >
              Créer mon bijou
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

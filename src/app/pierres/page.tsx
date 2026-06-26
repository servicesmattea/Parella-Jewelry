import type { Metadata } from "next";
import StoneGuide from "@/components/StoneGuide";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Les pierres — Parella Atelier",
  description:
    "Découvrez les pierres naturelles choisies pour leurs nuances, leur beauté et les énergies qu'elles peuvent accompagner.",
};

export default async function PierresPage({
  searchParams,
}: {
  searchParams: Promise<{ pierre?: string }>;
}) {
  const { pierre } = await searchParams;

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Les pierres Parella
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-3">
              Chaque pierre porte une signification
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-beige-dark)] mt-4 max-w-xl">
              Des pierres choisies pour leurs nuances, leur beauté et les
              énergies qu&apos;elles peuvent accompagner. Explorez celles qui
              vous attirent et laissez-vous guider.
            </p>
          </Reveal>
        </div>
      </div>

      <StoneGuide initialStoneId={pierre} showHeading={false} />
    </div>
  );
}

import type { Metadata } from "next";
import StoneGuide from "@/components/StoneGuide";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Le langage des pierres — Parella Jewelry",
  description:
    "Découvrez la signification de chaque pierre naturelle, matière naturelle et perle décorative utilisée dans les créations Parella Jewelry.",
};

export default async function PierresPage({
  searchParams,
}: {
  searchParams: Promise<{ pierre?: string }>;
}) {
  const { pierre } = await searchParams;

  return (
    <div className="bg-white">
      <div className="bg-[var(--color-cream)] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Lithothérapie
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-3">
              Le langage des pierres
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-beige-dark)] mt-4 max-w-xl">
              Chaque matière que nous enfilons porte une histoire. Nous
              distinguons les pierres naturelles et semi-précieuses, les
              matières naturelles comme la nacre, et les perles décoratives
              et fantaisie — pour rester précis et transparents sur ce que
              vous portez.
            </p>
          </Reveal>
        </div>
      </div>

      <StoneGuide initialStoneId={pierre} showHeading={false} />
    </div>
  );
}

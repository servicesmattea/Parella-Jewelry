import type { Metadata } from "next";
import StoneGuide from "@/components/StoneGuide";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Le langage des pierres — Parella Jewelry",
  description:
    "Découvrez la signification et les bienfaits de chaque pierre naturelle utilisée dans les créations Parella Jewelry.",
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
              Chaque pierre naturelle que nous enfilons porte une histoire et
              une signification. Parcourez la liste pour trouver celle qui
              vous correspond, avant de la composer dans votre bracelet.
            </p>
          </Reveal>
        </div>
      </div>

      <StoneGuide initialStoneId={pierre} showHeading={false} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Craftsmanship from "@/components/Craftsmanship";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notre maison — Parella Atelier",
  description:
    "L'histoire de Parella Atelier : un atelier français dédié à la création de bijoux en pierres naturelles, imaginés et réalisés à la main.",
};

const MILESTONES = [
  { year: "An 1", text: "Premiers bracelets enfilés à la main, dans un petit atelier." },
  { year: "An 2", text: "Lancement du configurateur 3D, pour composer son bracelet pierre par pierre." },
  { year: "Aujourd'hui", text: "Plus de 12 000 bracelets portés, chacun unique." },
];

export default function NotreMaisonPage() {
  return (
    <div className="bg-white">
      <div className="bg-[var(--color-cream)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Notre maison
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-4 text-balance">
              Une joaillerie pensée comme un atelier,{" "}
              <span className="italic text-[var(--color-electric)]">pas une usine.</span>
            </h1>
            <p className="text-base text-[var(--color-beige-dark)] mt-6 max-w-2xl mx-auto leading-relaxed">
              Parella Atelier est né d&apos;une idée simple : un bracelet ne
              devrait jamais cacher ses pierres derrière une chaîne épaisse.
              Nous enfilons chaque pierre naturelle, une à une, sur un fil
              élastique transparent qui s&apos;efface pour ne laisser parler
              que la matière.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid sm:grid-cols-3 gap-8">
        {MILESTONES.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.1}>
            <p className="font-display text-2xl text-[var(--color-electric)]">{m.year}</p>
            <p className="text-sm text-[var(--color-beige-dark)] mt-2 leading-relaxed">{m.text}</p>
          </Reveal>
        ))}
      </div>

      <Craftsmanship />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center border-t border-[var(--color-beige)]/20">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-beige-darker)] mb-4">
            Envie de composer le vôtre ?
          </h2>
          <p className="text-sm text-[var(--color-beige-dark)] mb-8">
            Choisissez vos pierres, une à une, dans notre configurateur 3D.
          </p>
          <Link
            href="/configurateur"
            className="inline-flex items-center justify-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
          >
            Composer mon bracelet
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

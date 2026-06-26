import Link from "next/link";
import Reveal from "./Reveal";

const ENERGIES = [
  {
    label: "Confiance",
    sub: "Affirmez votre force intérieure",
    hex: "#B6792A",
  },
  {
    label: "Amour",
    sub: "Douceur et liens précieux",
    hex: "#E7B9C4",
  },
  {
    label: "Sérénité",
    sub: "Apaiser le mental, retrouver l'équilibre",
    hex: "#8E6BBF",
  },
  {
    label: "Protection",
    sub: "Ancrer et préserver votre énergie",
    hex: "#3D3D40",
  },
  {
    label: "Énergie",
    sub: "Retrouver l'élan et la vitalité",
    hex: "#C1602E",
  },
  {
    label: "Chance",
    sub: "Ouvrir de nouvelles opportunités",
    hex: "#5E9E78",
  },
];

export default function EnergySection() {
  return (
    <section className="bg-[var(--color-sand)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              Vos intentions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3 text-balance">
              Quelle énergie souhaitez-vous inviter{" "}
              <span className="italic text-[var(--color-electric)]">dans votre quotidien ?</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {ENERGIES.map((e, i) => (
            <Reveal key={e.label} delay={i * 0.07}>
              <Link
                href={`/bracelets?energie=${encodeURIComponent(e.label)}`}
                className="group flex flex-col items-center gap-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 p-6 sm:p-8 text-center hover:border-[var(--color-beige)]/60 hover:shadow-lifted transition-all duration-300"
              >
                <span
                  className="w-12 h-12 rounded-full ring-4 ring-white shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: e.hex }}
                />
                <span>
                  <span className="block font-display text-lg text-[var(--color-beige-darker)]">
                    {e.label}
                  </span>
                  <span className="block text-xs text-[var(--color-beige-dark)] mt-1 leading-relaxed">
                    {e.sub}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center text-xs text-[var(--color-beige-dark)]/60 mt-10 italic">
            Chaque bracelet Parella est composé de pierres choisies pour les intentions qu&apos;elles évoquent.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    name: "Camille R.",
    text: "J'ai pu créer un bracelet avec mes pierres préférées en quelques minutes. La qualité est top !",
    rating: 5,
  },
  {
    name: "Lina B.",
    text: "Le bracelet est encore plus joli en vrai. J'ai adoré choisir mes pierres, c'est exactement l'effet que je voulais.",
    rating: 5,
  },
  {
    name: "Sofia M.",
    text: "J'ai adoré pouvoir choisir mes pierres selon leur signification pour un cadeau personnalisé. Livraison rapide en plus.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
          Avis clientes
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
          Elles portent Parella Atelier
        </h2>
        <p className="text-sm text-[var(--color-beige-dark)] mt-4">
          Des créations choisies pour soi, offertes avec attention et portées au quotidien.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-[var(--color-beige)]/30 bg-white p-7 transition-shadow hover:shadow-soft">
              <div className="flex gap-1 mb-4 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={15}
                    fill={j < r.rating ? "currentColor" : "none"}
                    className={j < r.rating ? "" : "text-[var(--color-beige)]/50"}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-beige-dark)] leading-relaxed mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-[var(--color-beige-darker)]">
                {r.name}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

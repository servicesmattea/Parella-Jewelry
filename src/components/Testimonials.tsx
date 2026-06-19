import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Camille R.",
    text: "Le configurateur 3D est génial, j'ai pu créer un bracelet avec mes pierres préférées en quelques minutes. La qualité est top !",
    rating: 5,
  },
  {
    name: "Lina B.",
    text: "Très belle finition, le métal ne noircit pas même au quotidien. Le bracelet Aube est encore plus joli en vrai.",
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
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
          Ils nous font confiance
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
          Ce qu&apos;en disent nos clientes
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-[var(--color-beige)]/30 p-7"
          >
            <div className="flex gap-1 mb-4 text-[var(--color-electric)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < r.rating ? "currentColor" : "none"}
                  className={i < r.rating ? "" : "text-[var(--color-beige)]/50"}
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
        ))}
      </div>
    </section>
  );
}

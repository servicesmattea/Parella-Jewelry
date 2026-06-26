import { Gem, Leaf, Heart, Truck } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const ITEMS = [
  {
    icon: Gem,
    title: "Pierres naturelles sélectionnées",
    text: "Choisies pour leurs nuances, leurs couleurs et les énergies qu'elles évoquent.",
  },
  {
    icon: Leaf,
    title: "Créations artisanales",
    text: "Chaque bijou est réalisé avec soin, pierre après pierre, dans notre atelier.",
  },
  {
    icon: Heart,
    title: "Pour soi ou à offrir",
    text: "Une création personnelle, un porte-bonheur ou une attention précieuse.",
  },
  {
    icon: Truck,
    title: "Livraison offerte dès 60 €",
    text: "Expédition soignée et suivie, en France et en Europe.",
  },
];

export default function Craftsmanship({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <section id="maison" className="bg-[var(--color-cream)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              L&apos;univers Parella
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
              Des créations pensées pour accompagner vos énergies.
            </h2>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <TiltCard max={5} className="h-full bg-white rounded-2xl p-7 text-center flex flex-col items-center shadow-soft hover:shadow-lifted transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[var(--color-electric)]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[var(--color-electric)]" />
                </div>
                <h3 className="font-display text-lg text-[var(--color-beige-darker)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-beige-dark)] leading-relaxed">
                  {text}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Gem, Leaf, RefreshCcw, Truck } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    icon: Gem,
    title: "Pierres naturelles certifiées",
    text: "Chaque pierre est sélectionnée à la main pour sa qualité et son authenticité.",
  },
  {
    icon: Leaf,
    title: "Fabrication artisanale",
    text: "Nos bracelets sont assemblés en petites séries dans notre atelier français.",
  },
  {
    icon: RefreshCcw,
    title: "Retours sous 30 jours",
    text: "Pas convaincu·e ? Retournez votre commande sans condition pendant 30 jours.",
  },
  {
    icon: Truck,
    title: "Livraison offerte dès 60€",
    text: "Expédition soignée et suivie, en France et en Europe.",
  },
];

export default function Craftsmanship() {
  return (
    <section id="maison" className="bg-[var(--color-cream)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
            Notre maison
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
            Une joaillerie pensée avec soin
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full bg-white rounded-2xl p-7 text-center flex flex-col items-center transition-shadow hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[var(--color-electric)]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[var(--color-electric)]" />
                </div>
                <h3 className="font-display text-lg text-[var(--color-beige-darker)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-beige-dark)] leading-relaxed">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

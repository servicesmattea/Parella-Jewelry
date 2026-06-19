import { Sparkles } from "lucide-react";
import StoneBead2D from "./StoneBead2D";
import Reveal from "./Reveal";

const RING_COLORS = [
  "#E7B9C4",
  "#2A4B9B",
  "#E2B33C",
  "#5A6B73",
  "#2FA0A0",
  "#7A1F2B",
  "#8E6BBF",
  "#B6792A",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)]">
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[var(--color-electric)]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-[var(--color-beige)]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-[var(--color-electric)] bg-[var(--color-electric)]/10 px-3 py-1.5 rounded-full">
            <Sparkles size={14} />
            Nouvelle collection Pierres Naturelles
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[var(--color-beige-darker)] mt-6 text-balance">
            Des bracelets qui racontent
            <span className="text-[var(--color-electric)]"> votre histoire.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--color-beige-dark)] max-w-md leading-relaxed">
            Découvrez nos bracelets en pierres naturelles, prêts à porter ou
            entièrement personnalisables. Composez le vôtre en 3D, pierre par
            pierre, et choisissez les énergies qui vous accompagnent.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#bracelets"
              className="inline-flex items-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-beige-darker)] text-white text-sm font-semibold tracking-wide hover:bg-[var(--color-electric)] transition-colors"
            >
              Découvrir la collection
            </a>
            <a
              href="#configurateur"
              className="inline-flex items-center min-h-11 px-7 py-3.5 rounded-full border-2 border-[var(--color-electric)] text-[var(--color-electric)] text-sm font-semibold tracking-wide hover:bg-[var(--color-electric)] hover:text-white transition-colors"
            >
              Créer mon bracelet
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-[var(--color-beige-darker)]">
            <div>
              <p className="font-display text-2xl">12k+</p>
              <p className="text-xs text-[var(--color-beige-dark)] mt-1">Clientes &amp; clients comblés</p>
            </div>
            <div className="w-px h-10 bg-[var(--color-beige)]/40" />
            <div>
              <p className="font-display text-2xl">4.9/5</p>
              <p className="text-xs text-[var(--color-beige-dark)] mt-1">Note moyenne vérifiée</p>
            </div>
            <div className="w-px h-10 bg-[var(--color-beige)]/40" />
            <div>
              <p className="font-display text-2xl">100%</p>
              <p className="text-xs text-[var(--color-beige-dark)] mt-1">Pierres naturelles</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative aspect-square w-full max-w-lg mx-auto">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-electric)] via-[var(--color-electric-light)] to-[var(--color-beige)] opacity-90" />
          <div className="absolute inset-3 rounded-[2.2rem] bg-[var(--color-cream)] flex items-center justify-center overflow-hidden">
            <div className="relative w-3/4 aspect-square rounded-full border-2 border-white/70 ring-1 ring-[var(--color-beige)]/20 flex items-center justify-center">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const r = 44;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <span
                    key={i}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <StoneBead2D hex={RING_COLORS[i % RING_COLORS.length]} index={i} size={15} />
                  </span>
                );
              })}
              <p className="text-xs uppercase tracking-widest text-[var(--color-beige-dark)] text-center px-6">
                Votre photo
                <br />
                ici
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

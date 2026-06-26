"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import Magnetic from "./MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--color-cream)]">
      <motion.div
        style={{ y: blobY }}
        className="absolute -bottom-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-[var(--color-rose)]/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-[var(--color-electric)] bg-[var(--color-electric)]/10 px-3 py-1.5 rounded-full">
            Atelier Parella — pierre par pierre
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[var(--color-beige-darker)] mt-6 text-balance">
            Composez votre bracelet,{" "}
            <span className="italic text-[var(--color-electric)]">
              une pierre à la fois.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--color-beige-dark)] max-w-md leading-relaxed">
            Choisissez vos pierres naturelles et donnez un sens à ce que vous
            portez. Prêt à porter ou entièrement composé par vous.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#configurateur"
                className="inline-flex items-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold tracking-wide shadow-lifted hover:bg-[var(--color-electric-dark)] transition-colors"
              >
                Composer mon bracelet
              </a>
            </Magnetic>
            <a
              href="#bracelets"
              className="inline-flex items-center min-h-11 px-7 py-3.5 rounded-full border-2 border-[var(--color-beige-darker)] text-[var(--color-beige-darker)] text-sm font-semibold tracking-wide hover:bg-[var(--color-beige-darker)] hover:text-white transition-colors"
            >
              Voir la collection
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
              <p className="font-display text-base leading-snug">Créations artisanales</p>
              <p className="text-xs text-[var(--color-beige-dark)] mt-1">Réalisées avec soin</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative aspect-square w-full max-w-lg mx-auto">
          <motion.div style={{ y: visualY }} className="absolute inset-0">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[var(--color-sand)] overflow-hidden shadow-lifted">
              <Image
                src="/bracelets/domino-1.jpg"
                alt="Bracelet Parella"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

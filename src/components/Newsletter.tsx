"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./MagneticButton";

export const NEWSLETTER_CODE = "BIENVENUE20";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="relative bg-[var(--color-beige-darker)] py-16 sm:py-20">
      <Reveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
          -20% sur votre première commande
        </h2>
        <p className="text-white/80 text-sm mb-8">
          Inscrivez-vous à notre newsletter pour recevoir votre code de
          réduction et être averti·e en avant-première de nos nouvelles
          collections.
        </p>

        {submitted ? (
          <div className="inline-flex flex-col items-center gap-2 text-white font-medium bg-white/15 px-6 py-4 rounded-2xl">
            <span className="inline-flex items-center gap-2">
              <Check size={18} /> Merci ! Votre code de réduction&nbsp;:
            </span>
            <span className="font-display text-lg tracking-widest bg-white/20 px-4 py-1.5 rounded-full">
              {NEWSLETTER_CODE}
            </span>
            <span className="text-white/70 text-xs">
              À utiliser dans votre panier, -20% sur votre première commande.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 px-5 py-3.5 rounded-full text-sm text-[var(--color-beige-darker)] placeholder:text-[var(--color-beige-dark)]/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Magnetic>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-11 px-6 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
              >
                S&apos;inscrire <ArrowRight size={15} />
              </button>
            </Magnetic>
          </form>
        )}
      </Reveal>

      <svg
        className="absolute bottom-0 left-0 w-full h-10 sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,56 C360,0 1080,0 1440,56 Z" fill="var(--color-cream)" />
      </svg>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-[var(--color-electric)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
          -10% sur votre première commande
        </h2>
        <p className="text-white/80 text-sm mb-8">
          Inscrivez-vous à notre newsletter pour recevoir votre code de
          réduction et être averti·e en avant-première de nos nouvelles
          collections.
        </p>

        {submitted ? (
          <p className="inline-flex items-center gap-2 text-white font-medium bg-white/15 px-5 py-3 rounded-full">
            <Check size={18} /> Merci ! Vérifiez votre boîte mail.
          </p>
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
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-beige-darker)] text-white text-sm font-semibold hover:bg-black transition-colors"
            >
              S&apos;inscrire <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

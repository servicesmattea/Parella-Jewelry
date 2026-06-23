"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Lock, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/MagneticButton";

export default function ComptePage() {
  const [tab, setTab] = useState<"connexion" | "creation">("connexion");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-beige-dark)]">
          <Link href="/" className="hover:text-[var(--color-electric)]">Accueil</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-beige-darker)]">Mon compte</span>
        </nav>
      </div>

      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Reveal>
          <h1 className="font-display text-3xl text-[var(--color-beige-darker)] text-center mb-8">
            Mon compte
          </h1>

          <div className="flex border border-[var(--color-beige)]/40 rounded-full p-1 mb-8">
            {(["connexion", "creation"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setSubmitted(false);
                }}
                className={`flex-1 min-h-9 rounded-full text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-[var(--color-electric)] text-white"
                    : "text-[var(--color-beige-darker)]"
                }`}
              >
                {t === "connexion" ? "Connexion" : "Créer un compte"}
              </button>
            ))}
          </div>

          {submitted ? (
            <p className="text-sm text-[var(--color-beige-dark)] bg-[var(--color-cream)] rounded-xl px-4 py-4 text-center leading-relaxed">
              Maquette : la connexion par compte n&apos;est pas encore
              branchée. Cet écran montre à quoi ressemblera le flux.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "creation" && (
                <input
                  type="text"
                  required
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-beige)]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]"
                />
              )}
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-beige-dark)]" />
                <input
                  type="email"
                  required
                  placeholder="Adresse e-mail"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-beige)]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-beige-dark)]" />
                <input
                  type="password"
                  required
                  placeholder="Mot de passe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-beige)]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]"
                />
              </div>

              <Magnetic className="block w-full">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center min-h-11 px-6 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
                >
                  {tab === "connexion" ? "Se connecter" : "Créer mon compte"}
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

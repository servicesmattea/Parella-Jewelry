import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="bg-[var(--color-cream)] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
              {eyebrow}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-beige-darker)] mt-3">
              {title}
            </h1>
            {intro && (
              <p className="text-sm sm:text-base text-[var(--color-beige-dark)] mt-4 max-w-xl mx-auto">
                {intro}
              </p>
            )}
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Reveal>
          <div className="space-y-8 text-[var(--color-beige-dark)] leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-[var(--color-beige-darker)] [&_h2]:mb-3 [&_strong]:text-[var(--color-beige-darker)] [&_strong]:font-semibold [&_a]:text-[var(--color-electric)] [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

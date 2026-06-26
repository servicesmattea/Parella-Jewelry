import Link from "next/link";
import Image from "next/image";
import { stones } from "@/data/stones";
import Reveal from "./Reveal";

const PREVIEW_IDS = [
  "rose-quartz",
  "tiger-eye",
  "amethyst",
  "citrine",
  "green-aventurine",
  "carnelian",
];

const preview = PREVIEW_IDS.map((id) => stones.find((s) => s.id === id)!).filter(Boolean);

export default function StonesPreview() {
  return (
    <section className="bg-[var(--color-cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
                Les pierres Parella
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3">
                Des pierres choisies avec intention
              </h2>
            </div>
            <Link
              href="/pierres"
              className="text-sm font-medium text-[var(--color-electric)] hover:text-[var(--color-electric-dark)] underline-offset-4 hover:underline"
            >
              Découvrir toutes les pierres →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {preview.map((stone, i) => (
            <Reveal key={stone.id} delay={i * 0.07}>
              <Link
                href={`/pierres?pierre=${stone.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-[var(--color-sand)] hover:shadow-lifted transition-shadow duration-300"
              >
                {stone.photo ? (
                  <Image
                    src={stone.photo}
                    alt={stone.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: stone.hex }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-base text-white drop-shadow-sm">
                    {stone.name}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                    {stone.benefits[0]}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { label: "Bracelets prêts à porter", href: "/bracelets" },
      { label: "Créer mon bracelet", href: "/configurateur" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Notre histoire", href: "/notre-maison" },
      { label: "Pierres & significations", href: "/pierres" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl text-white tracking-[0.08em]">
            PARELLA <span className="text-[var(--color-gold)]">JEWELRY</span>
          </p>
          <p className="text-sm mt-4 max-w-xs leading-relaxed">
            Bracelets en pierres naturelles, prêts à porter ou créés sur
            mesure. Composez votre bijou et sa signification.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-white text-sm font-semibold mb-4">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} Parella Jewelry. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

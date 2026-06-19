function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8.3v2.8h2.2V21h3z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.2c.8.9 1.9 1.5 3.1 1.6v2.6c-1.3 0-2.5-.4-3.5-1.1v6.3a4.9 4.9 0 1 1-4.2-4.9v2.7a2.2 2.2 0 1 0 1.6 2.2V3h2.7c.1.8.3 1.6.3 2.2z" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Boutique",
    links: ["Bracelets prêts à porter", "Créer mon bracelet", "Nouveautés", "Cartes cadeaux"],
  },
  {
    title: "Aide",
    links: ["Livraison & retours", "Guide des tailles", "Entretien des bijoux", "Contact"],
  },
  {
    title: "À propos",
    links: ["Notre histoire", "Pierres & significations", "Engagement qualité", "Presse"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-beige-darker)] text-white/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-white tracking-[0.08em]">
            PARELLA <span className="text-[var(--color-electric-light)]">JEWELRY</span>
          </p>
          <p className="text-sm mt-4 max-w-xs leading-relaxed">
            Bracelets en pierres naturelles, prêts à porter ou créés sur
            mesure. Composez votre bijou et sa signification.
          </p>
          <div className="flex gap-3 mt-6">
            {[InstagramIcon, FacebookIcon, TikTokIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Réseau social"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-electric)] transition-colors"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-white text-sm font-semibold mb-4">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
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

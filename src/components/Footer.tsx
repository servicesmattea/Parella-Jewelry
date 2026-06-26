import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl text-white tracking-[0.08em]">
            PARELLA <span className="text-[var(--color-gold)]">ATELIER</span>
          </p>
          <p className="text-sm mt-4 max-w-xs leading-relaxed">
            Des créations artisanales en pierres naturelles, pensées pour
            accompagner vos intentions, révéler votre énergie et devenir vos
            porte-bonheur du quotidien.
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Boutique</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/bracelets" className="hover:text-white transition-colors">Bracelets</Link></li>
            <li><Link href="/configurateur" className="hover:text-white transition-colors">Créer mon bijou</Link></li>
            <li><Link href="/panier" className="hover:text-white transition-colors">Panier</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Découvrir</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/pierres" className="hover:text-white transition-colors">Les pierres</Link></li>
            <li><Link href="/notre-maison" className="hover:text-white transition-colors">L&apos;univers Parella</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} Parella Atelier. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

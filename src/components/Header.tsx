"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Bracelets", href: "#bracelets" },
  { label: "Créer le mien", href: "#configurateur" },
  { label: "Pierres & significations", href: "#pierres" },
  { label: "Notre maison", href: "#maison" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[var(--color-electric)] text-white text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
        Livraison offerte dès 60€ · Gravure gratuite sur tous les bracelets
      </div>
      <header
        className={`transition-all border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur border-black/10 shadow-sm"
            : "bg-white border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
          <button
            className="lg:hidden p-2 -ml-2 text-[var(--color-beige-darker)]"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-[0.08em] text-[var(--color-beige-darker)]"
          >
            PARELLA <span className="text-[var(--color-electric)]">JEWELRY</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 text-[var(--color-beige-darker)]">
            <button aria-label="Rechercher" className="hover:text-[var(--color-electric)] transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button aria-label="Compte" className="hover:text-[var(--color-electric)] transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <button aria-label="Panier" className="relative hover:text-[var(--color-electric)] transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-electric)] text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="bg-white h-full w-72 p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-[var(--color-beige-darker)]">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-[var(--color-beige-darker)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

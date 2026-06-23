"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { label: "Bracelets", href: "/bracelets" },
  { label: "Créer le mien", href: "/configurateur" },
  { label: "Pierres & significations", href: "/pierres" },
  { label: "Notre maison", href: "/notre-maison" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

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
            className="lg:hidden w-11 h-11 flex items-center justify-center -ml-2 text-[var(--color-beige-darker)]"
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
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[var(--color-electric)] after:transition-all ${
                    isActive
                      ? "text-[var(--color-electric)] after:w-full"
                      : "text-[var(--color-beige-darker)] hover:text-[var(--color-electric)] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center text-[var(--color-beige-darker)]">
            <button
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 hidden sm:flex items-center justify-center hover:text-[var(--color-electric)] transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              href="/compte"
              aria-label="Compte"
              className="w-11 h-11 hidden sm:flex items-center justify-center hover:text-[var(--color-electric)] transition-colors"
            >
              <User size={20} />
            </Link>
            <Link
              href="/panier"
              aria-label="Panier"
              className="relative w-11 h-11 flex items-center justify-center hover:text-[var(--color-electric)] transition-colors"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1.5 right-1.5 bg-[var(--color-electric)] text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            </Link>
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
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="w-11 h-11 -mr-2 flex items-center justify-center"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-[var(--color-beige-darker)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/compte"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[var(--color-beige-darker)]"
              >
                Mon compte
              </Link>
              <Link
                href="/panier"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[var(--color-beige-darker)]"
              >
                Panier ({count})
              </Link>
            </nav>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

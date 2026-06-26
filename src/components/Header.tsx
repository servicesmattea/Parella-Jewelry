"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { label: "Bracelets", href: "/bracelets" },
  { label: "Créer mon bijou", href: "/configurateur" },
  { label: "Les pierres", href: "/pierres" },
  { label: "L'univers Parella", href: "/notre-maison" },
];

const BANNER_ITEMS = [
  "Livraison offerte dès 60 €",
  "Créations réalisées à la main",
  "Pierres naturelles sélectionnées",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNER_ITEMS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Bannière */}
      <div className="bg-[var(--color-beige-darker)] text-white/90 text-center text-xs py-2 px-4 tracking-wide">
        {/* Mobile : un message à la fois, rotatif */}
        <span className="sm:hidden">{BANNER_ITEMS[bannerIdx]}</span>
        {/* Desktop : tout sur une ligne */}
        <span className="hidden sm:inline">
          {BANNER_ITEMS.join(" · ")}
        </span>
      </div>

      <header
        className={`transition-all border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur border-black/10 shadow-sm"
            : "bg-white border-transparent"
        }`}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          {/* Burger — mobile uniquement */}
          <button
            className="lg:hidden w-11 h-11 flex items-center justify-center -ml-2 text-[var(--color-beige-darker)]"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo — centré sur mobile grâce à absolute, normal sur desktop */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 font-display text-2xl sm:text-[1.6rem] tracking-[0.08em] text-[var(--color-beige-darker)] whitespace-nowrap"
          >
            PARELLA <span className="text-[var(--color-gold)]">ATELIER</span>
          </Link>

          {/* Nav desktop */}
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

          {/* Icônes */}
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
              {count > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[var(--color-electric)] text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[var(--color-cream)] h-full w-80 max-w-[85vw] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-beige)]/30">
              <span className="font-display text-xl text-[var(--color-beige-darker)]">
                PARELLA <span className="text-[var(--color-gold)]">ATELIER</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="w-10 h-10 -mr-2 flex items-center justify-center text-[var(--color-beige-darker)]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3.5 border-b border-[var(--color-beige)]/20 text-base font-medium transition-colors ${
                      isActive
                        ? "text-[var(--color-electric)]"
                        : "text-[var(--color-beige-darker)] hover:text-[var(--color-electric)]"
                    }`}
                  >
                    {link.label}
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-[var(--color-beige)]/30 flex flex-col gap-1">
                <Link
                  href="/compte"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm text-[var(--color-beige-dark)] hover:text-[var(--color-electric)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User size={16} /> Mon compte
                  </span>
                  <ArrowRight size={14} className="opacity-30" />
                </Link>
                <Link
                  href="/panier"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm text-[var(--color-beige-dark)] hover:text-[var(--color-electric)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={16} /> Panier
                    {count > 0 && (
                      <span className="bg-[var(--color-electric)] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </span>
                  <ArrowRight size={14} className="opacity-30" />
                </Link>
              </div>
            </nav>

            {/* CTA en bas */}
            <div className="px-6 pb-8 pt-4 border-t border-[var(--color-beige)]/30">
              <Link
                href="/configurateur"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full min-h-11 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
              >
                Créer mon bijou
              </Link>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

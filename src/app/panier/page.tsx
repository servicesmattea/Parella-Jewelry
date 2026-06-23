"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { NEWSLETTER_CODE } from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/MagneticButton";

const FREE_SHIPPING_THRESHOLD = 60;
const NEWSLETTER_DISCOUNT_RATE = 0.2;

export default function PanierPage() {
  const cart = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal);
  const discount = promoApplied ? cart.subtotal * NEWSLETTER_DISCOUNT_RATE : 0;
  const total = cart.subtotal - discount;

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === NEWSLETTER_CODE) {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  }

  function handleCheckout() {
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Reveal>
          <div className="w-16 h-16 rounded-full bg-[var(--color-electric)]/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={26} className="text-[var(--color-electric)]" />
          </div>
          <h1 className="font-display text-3xl text-[var(--color-beige-darker)] mb-3">
            Commande simulée
          </h1>
          <p className="text-sm text-[var(--color-beige-dark)] leading-relaxed">
            Ceci est une maquette : le paiement n&apos;est pas encore branché.
            Sur le site final, vous arriveriez ici à un tunnel de paiement
            sécurisé.
          </p>
          <Link
            href="/bracelets"
            className="inline-flex items-center justify-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-beige-darker)] text-white text-sm font-semibold mt-8 hover:bg-[var(--color-electric)] transition-colors"
          >
            Continuer mes achats
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[60vh]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-beige-dark)]">
          <Link href="/" className="hover:text-[var(--color-electric)]">Accueil</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-beige-darker)]">Panier</span>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mb-10">
          Votre panier
        </h1>

        {cart.items.length === 0 ? (
          <Reveal>
            <div className="text-center py-16 border border-dashed border-[var(--color-beige)]/40 rounded-2xl">
              <ShoppingBag size={32} className="mx-auto text-[var(--color-beige)] mb-4" />
              <p className="text-[var(--color-beige-dark)] mb-6">Votre panier est vide.</p>
              <Link
                href="/bracelets"
                className="inline-flex items-center justify-center min-h-11 px-7 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
              >
                Découvrir la collection
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10">
            <div className="divide-y divide-[var(--color-beige)]/20">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-5">
                  <span
                    className="w-16 h-16 rounded-xl shrink-0 shadow-soft"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.7), transparent 45%), ${item.hex}`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg text-[var(--color-beige-darker)] truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-[var(--color-beige-dark)]">
                      {item.price.toFixed(2)} € / unité
                    </p>
                    {item.kind === "custom" && item.customConfig && (
                      <Link
                        href={`/configurateur?edit=${item.id}`}
                        className="text-xs text-[var(--color-electric)] hover:underline"
                      >
                        Modifier la composition
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center border border-[var(--color-beige)]/40 rounded-full">
                    <button
                      onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                      aria-label="Diminuer la quantité"
                      className="w-9 h-9 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)]"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                      aria-label="Augmenter la quantité"
                      className="w-9 h-9 flex items-center justify-center text-[var(--color-beige-darker)] hover:text-[var(--color-electric)]"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="w-20 text-right font-semibold text-[var(--color-electric)]">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    onClick={() => cart.remove(item.id)}
                    aria-label={`Retirer ${item.name}`}
                    className="w-9 h-9 flex items-center justify-center text-[var(--color-beige-dark)] hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[var(--color-cream)] rounded-2xl p-6 sm:p-7 h-fit">
              <h2 className="font-display text-xl text-[var(--color-beige-darker)] mb-5">
                Récapitulatif
              </h2>
              <div className="flex items-center justify-between text-sm text-[var(--color-beige-dark)] mb-2">
                <span>Sous-total</span>
                <span>{cart.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[var(--color-beige-dark)] mb-5">
                <span>Livraison</span>
                <span>{remaining === 0 ? "Offerte" : "Calculée à l'étape suivante"}</span>
              </div>

              {remaining > 0 && (
                <div className="flex items-center gap-2 text-xs text-[var(--color-electric)] bg-[var(--color-electric)]/10 rounded-xl px-3 py-2.5 mb-5">
                  <Truck size={14} />
                  Ajoutez {remaining.toFixed(2)} € pour la livraison offerte
                </div>
              )}

              {promoApplied ? (
                <div className="flex items-center justify-between text-sm text-[var(--color-electric)] mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} /> Code {NEWSLETTER_CODE} (-20%)
                  </span>
                  <span>-{discount.toFixed(2)} €</span>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError(false);
                      }}
                      placeholder="Code de réduction"
                      className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white border border-[var(--color-beige)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[var(--color-beige-darker)] text-white text-sm font-semibold hover:bg-[var(--color-electric)] transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-500 mt-1.5">Code invalide.</p>
                  )}
                </form>
              )}

              <div className="flex items-center justify-between border-t border-[var(--color-beige)]/30 pt-4 mb-6">
                <span className="font-medium text-[var(--color-beige-darker)]">Total</span>
                <span className="font-display text-2xl text-[var(--color-beige-darker)]">
                  {total.toFixed(2)} €
                </span>
              </div>

              <Magnetic className="block w-full">
                <button
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center min-h-11 px-6 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
                >
                  Passer la commande
                </button>
              </Magnetic>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

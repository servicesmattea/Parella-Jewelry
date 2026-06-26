import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre panier — Parella Atelier",
  description:
    "Retrouvez vos bracelets prêts à porter et vos créations personnalisées avant de finaliser votre commande Parella Atelier.",
};

export default function PanierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

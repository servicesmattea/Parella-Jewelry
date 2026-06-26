import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon compte — Parella Atelier",
  description:
    "Connectez-vous ou créez votre compte Parella Atelier pour suivre vos commandes et vos bracelets personnalisés.",
};

export default function CompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

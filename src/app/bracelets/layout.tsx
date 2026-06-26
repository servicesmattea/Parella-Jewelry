import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous nos bracelets — Parella Atelier",
  description:
    "Découvrez toute la collection de bijoux Parella Atelier : bracelets, colliers et chaînes de pied en pierres naturelles, créés à la main.",
};

export default function BraceletsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

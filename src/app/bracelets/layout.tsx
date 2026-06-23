import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous nos bracelets — Parella Jewelry",
  description:
    "Découvrez toute la collection de bracelets Parella Jewelry : pierres naturelles enfilées à la main sur un fil élastique transparent.",
};

export default function BraceletsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

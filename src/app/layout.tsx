import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Parella Atelier — Bracelets fins & personnalisables",
  description:
    "Parella Atelier crée des bracelets élégants et des bracelets personnalisés en pierres naturelles. Composez le vôtre en 3D et découvrez la signification de chaque pierre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <GrainOverlay />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

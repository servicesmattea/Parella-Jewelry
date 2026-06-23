import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bracelets, getBraceletById } from "@/data/bracelets";
import { stones } from "@/data/stones";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return bracelets.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const bracelet = getBraceletById(id);
  if (!bracelet) return {};
  return {
    title: `${bracelet.name} — Parella Jewelry`,
    description: bracelet.story,
  };
}

export default async function BraceletPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bracelet = getBraceletById(id);
  if (!bracelet) notFound();

  const stone = stones.find((s) => s.id === bracelet.stoneId);
  const related = bracelets.filter((b) => b.id !== bracelet.id).slice(0, 3);

  return <ProductDetail bracelet={bracelet} stone={stone} related={related} />;
}

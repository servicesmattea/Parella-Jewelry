import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Composez votre bracelet — Parella Atelier",
  description:
    "Imaginez votre bijou sur mesure : choisissez vos pierres naturelles et composez une pièce unique, à votre image.",
};

export default async function ConfigurateurPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  return <Configurator editId={edit} />;
}

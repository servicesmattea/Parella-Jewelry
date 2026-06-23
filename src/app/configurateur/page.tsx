import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Composez votre bracelet — Parella Jewelry",
  description:
    "Créez votre bracelet sur mesure en 3D : choisissez vos 45 pierres naturelles une à une sur un fil élastique transparent.",
};

export default async function ConfigurateurPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  return <Configurator editId={edit} />;
}

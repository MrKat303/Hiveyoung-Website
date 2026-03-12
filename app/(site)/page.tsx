import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import QueHacemos from "@/components/Home/QueHacemos";
import CongressCarousel from "@/components/Home/CongressCarousel";

export const metadata: Metadata = {
  title: {
    absolute: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
  },
  description:
    "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  alternates: {
    canonical: "https://hiveyoung.org",
  },
  openGraph: {
    title: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    description:
      "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <CongressCarousel />
    </>
  );
}

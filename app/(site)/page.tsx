import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import CongressCarousel from "@/components/Home/CongressCarousel";

export const metadata: Metadata = {
  title: "HiveYoung",
  description: "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  openGraph: {
    title: "HiveYoung",
    description: "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    url: "https://hiveyoung.cl/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <CongressCarousel />
    </>
  );
}

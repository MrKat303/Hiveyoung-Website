import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import QuienesSomos from "@/components/Home/QuienesSomos";
import QueHacemos from "@/components/Home/QueHacemos";
import CongressCarousel from "@/components/Home/CongressCarousel";
import JoinBanner from "@/components/Home/JoinBanner";

export const metadata: Metadata = {
  title: {
    absolute: "HiveYoung | Principal articulador del ecosistema juvenil",
  },
  description:
    "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  alternates: {
    canonical: "https://www.hiveyoung.org",
  },
  openGraph: {
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description:
      "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
        width: 1200,
        height: 630,
        alt: "HiveYoung | Articulador del Ecosistema Juvenil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description: "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuienesSomos />
      <QueHacemos />
      <CongressCarousel />
      <JoinBanner />
    </>
  );
}

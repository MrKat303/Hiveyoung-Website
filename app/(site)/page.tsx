import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import QuienesSomos from "@/components/Home/QuienesSomos";
import QueHacemos from "@/components/Home/QueHacemos";
import CongressCarousel from "@/components/Home/CongressCarousel";
import JoinBanner from "@/components/Home/JoinBanner";
import { getOpenGraphImage } from "@/data/open-graph";

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
    type: "website",
    locale: "es_CL",
    siteName: "HiveYoung",
    url: "https://www.hiveyoung.org",
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description:
      "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    images: [
      {
        url: getOpenGraphImage("home"),
        width: 1200,
        height: 630,
        alt: "Captura de la portada de HiveYoung con la invitación a crear el cambio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description: "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    images: [{
      url: getOpenGraphImage("home"),
      alt: "Captura de la página principal de HiveYoung",
    }],
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

import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import QuienesSomos from "@/components/Home/QuienesSomos";
import QueHacemos from "@/components/Home/QueHacemos";
import CongressCarousel from "@/components/Home/CongressCarousel";

export const metadata: Metadata = {
  title: {
    absolute: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
  },
  description:
    "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades y lidera el cambio.",
  alternates: {
    canonical: "https://hiveyoung.org",
  },
  openGraph: {
    title: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    description:
      "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile. Potencia tus habilidades y lidera el cambio.",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
        width: 1200,
        height: 630,
        alt: "HiveYoung - Articulador del Ecosistema Juvenil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    description: "Conectamos y potenciamos el talento joven en Chile y Latinoamérica.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuienesSomos />
      <QueHacemos />
      <CongressCarousel />
    </>
  );
}

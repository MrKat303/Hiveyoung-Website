import type { Metadata } from "next";
import { getOpenGraphImage } from "@/data/open-graph";

export const metadata: Metadata = {
  title: {
    absolute: "Congreso HiveYoung | Liderazgo e innovación juvenil en Chile",
  },
  description:
    "Congreso HiveYoung: el punto de encuentro de la nueva generación en Chile. Conoce nuestros pilares de liderazgo, tecnología, emprendimiento y red de conexión.",
  icons: {
    icon: "/images/congreso/favicon-congreso.svg",
    shortcut: "/images/congreso/favicon-congreso.svg",
  },
  alternates: {
    canonical: "https://congreso.hiveyoung.org",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Congreso HiveYoung",
    url: "https://congreso.hiveyoung.org",
    title: "Congreso HiveYoung | Liderazgo e innovación juvenil en Chile",
    description:
      "Congreso HiveYoung: el punto de encuentro de la nueva generación en Chile. Conoce nuestros pilares de liderazgo, tecnología, emprendimiento y red de conexión.",
    images: [
      {
        url: getOpenGraphImage("congreso"),
        width: 1200,
        height: 630,
        alt: "Orquesta en vivo en el escenario principal del Congreso HiveYoung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Congreso HiveYoung | Liderazgo e innovación juvenil en Chile",
    description: "Congreso HiveYoung: el punto de encuentro de la nueva generación en Chile. Conoce nuestros pilares de liderazgo, tecnología, emprendimiento y red de conexión.",
    images: [{
      url: getOpenGraphImage("congreso"),
      alt: "Orquesta durante el Congreso HiveYoung",
    }],
  },
};

export default function CongresoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

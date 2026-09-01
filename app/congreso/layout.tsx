import type { Metadata } from "next";

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
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258017/Orquesta_en_el_Congreso_HiveYoung_lcwip7.jpg",
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
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258017/Orquesta_en_el_Congreso_HiveYoung_lcwip7.jpg",
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

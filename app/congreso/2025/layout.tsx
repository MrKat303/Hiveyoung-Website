import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Congreso HiveYoung 2025",
  },
  description:
    "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Revive los mejores momentos, speakers, conversatorios, talleres y bandas en vivo.",
  alternates: {
    canonical: "https://congreso.hiveyoung.org/2025",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Congreso HiveYoung",
    url: "https://congreso.hiveyoung.org/2025",
    title: "Congreso HiveYoung 2025",
    description:
      "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Revive los mejores momentos, speakers, conversatorios, talleres y bandas en vivo.",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258233/Congreso_HiveYoung_Publico_Panel_tf94og.jpg",
        width: 1200,
        height: 630,
        alt: "Jóvenes participando en un panel del Congreso HiveYoung 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Congreso HiveYoung 2025",
    description: "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Revive los mejores momentos, speakers, conversatorios, talleres y bandas en vivo.",
    images: [{
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258233/Congreso_HiveYoung_Publico_Panel_tf94og.jpg",
      alt: "Panel con público en el Congreso HiveYoung 2025",
    }],
  },
};

export default function Congreso2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

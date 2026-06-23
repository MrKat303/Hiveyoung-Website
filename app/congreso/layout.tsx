import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Congreso HiveYoung",
    template: "%s | Congreso HiveYoung",
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
    title: "Congreso HiveYoung",
    description:
      "Congreso HiveYoung: el punto de encuentro de la nueva generación en Chile. Conoce nuestros pilares de liderazgo, tecnología, emprendimiento y red de conexión.",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
        width: 1200,
        height: 630,
        alt: "Congreso HiveYoung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Congreso HiveYoung",
    description: "Congreso HiveYoung: el punto de encuentro de la nueva generación en Chile. Conoce nuestros pilares de liderazgo, tecnología, emprendimiento y red de conexión.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
  },
};

export default function CongresoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

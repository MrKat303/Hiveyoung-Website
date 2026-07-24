import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


export const metadata: Metadata = {
  title: "HiveYoung Brand Kit | Identidad Visual Oficial",
  description:
    "Descarga los recursos de identidad visual oficial de HiveYoung: logos en SVG y PNG, paleta de colores, tipografías y guías de uso de marca.",
  keywords: [
    "HiveYoung brand kit",
    "identidad visual HiveYoung",
    "logo HiveYoung",
    "guía de marca HiveYoung",
    "brand guidelines HiveYoung",
    "recursos de marca HiveYoung",
  ],
  alternates: {
    canonical: "https://brand.hiveyoung.org",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "HiveYoung",
    title: "HiveYoung Brand Kit | Identidad Visual Oficial",
    description:
      "Descarga los recursos de identidad visual oficial de HiveYoung: logos, paleta de colores, tipografías y guías de uso.",
    url: "https://brand.hiveyoung.org",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
        width: 1200,
        height: 630,
        alt: "HiveYoung Brand Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveYoung Brand Kit | Identidad Visual Oficial",
    description:
      "Descarga los recursos de identidad visual oficial de HiveYoung: logos, paleta de colores, tipografías y guías de uso.",
    images: [
      "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="brand-root">
      {children}
    </div>
  );
}

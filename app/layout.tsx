import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisableRightClick from "@/components/DisableRightClick";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hiveyoung.org"),
  title: {
    default: "HiveYoung | Principal articulador del ecosistema juvenil",
    template: "%s | HiveYoung",
  },
  description:
    "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  keywords: [
    "HiveYoung",
    "HY",
    "Congreso HiveYoung",
    "ecosistema juvenil",
    "ecosistema juvenil en Latinoamérica",
    "organización juvenil en Chile",
    "plataforma para jóvenes líderes",
    "plataforma para jóvenes emprendedores",
    "comunidad de jóvenes líderes",
    "red de jóvenes líderes Chile",
    "talento joven en Chile",
    "liderazgo juvenil",
    "jóvenes líderes",
    "innovación juvenil",
    "ecosistema de innovación juvenil",
    "emprendimiento juvenil",
    "congreso juvenil en Chile",
    "voluntariado juvenil Chile",
    "voluntarios jóvenes Chile",
  ],
  authors: [{ name: "HiveYoung" }],
  creator: "HiveYoung",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "HiveYoung",
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description:
      "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    url: "https://hiveyoung.org",
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
    description:
      "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HiveYoung",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HiveYoung",
  url: "https://hiveyoung.org",
  logo: "https://hiveyoung.org/Logo.svg",
  description:
    "Principal articulador del ecosistema juvenil en Chile y Latinoamérica. Conectamos, potenciamos y visibilizamos el talento joven.",
  sameAs: [
    "https://www.instagram.com/hiveyoung.cl/",
    "https://cl.linkedin.com/company/hiveyoung",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "HiveYoung@gmail.com",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DisableRightClick />
        {children}
      </body>
    </html>
  );
}

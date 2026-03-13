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
    default: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    template: "%s | HiveYoung",
  },
  description:
    "HiveYoung es el principal articulador del ecosistema juvenil en Chile y Latinoamérica. Conectamos, potenciamos y visibilizamos el talento joven a través de liderazgo, innovación y acción colectiva.",
  keywords: [
    "HiveYoung",
    "Congreso HiveYoung",
    "ecosistema juvenil",
    "ecosistema juvenil en Latinoamérica",
    "organización juvenil en Chile",
    "plataforma para jóvenes líderes",
    "comunidad de jóvenes líderes",
    "talento joven en Chile",
    "liderazgo juvenil",
    "jóvenes líderes",
    "innovación juvenil",
    "ecosistema de innovación juvenil",
    "emprendimiento juvenil",
    "congreso juvenil en Chile",
  ],
  authors: [{ name: "HiveYoung" }],
  creator: "HiveYoung",
  icons: {
    icon: "/Favicon.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "HiveYoung",
    title: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    description:
      "Conectamos, potenciamos y visibilizamos el talento joven en Chile y Latinoamérica.",
    url: "https://hiveyoung.org",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
        width: 1200,
        height: 630,
        alt: "HiveYoung Card Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiveYoung | Principal Articulador del Ecosistema Juvenil",
    description:
      "Conectamos, potenciamos y visibilizamos el talento joven en Chile y Latinoamérica.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
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
    email: "hiveyoung@gmail.com",
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

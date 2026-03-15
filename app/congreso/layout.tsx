import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Congreso HiveYoung 2025",
  },
  description:
    "Congreso HiveYoung: el evento juvenil más importante de Chile. Speakers, conversatorios, talleres y bandas en vivo que inspiran a jóvenes a crear, innovar y emprender.",
  alternates: {
    canonical: "https://congreso.hiveyoung.org",
  },
  openGraph: {
    title: "Congreso HiveYoung 2025",
    description:
      "Congreso HiveYoung: el evento juvenil más importante de Chile. Speakers, conversatorios, talleres y bandas en vivo que inspiran a jóvenes a crear, innovar y emprender.",
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
    title: "Congreso HiveYoung 2025",
    description: "Congreso HiveYoung: el evento juvenil más importante de Chile. Speakers, conversatorios, talleres y bandas en vivo que inspiran a jóvenes a crear, innovar y emprender.",
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

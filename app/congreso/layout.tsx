import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Congreso HiveYoung 2025",
  description:
    "Congreso HiveYoung: el evento juvenil más importante de Chile, hecho por y para jóvenes. Speakers, networking, innovación y emprendimiento en un solo lugar.",
  alternates: {
    canonical: "https://hiveyoung.org/congreso",
  },
  openGraph: {
    title: "Congreso HiveYoung",
    description:
      "El evento juvenil más importante de Chile. Speakers, networking, innovación y emprendimiento en un solo lugar.",
  },
};

export default function CongresoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

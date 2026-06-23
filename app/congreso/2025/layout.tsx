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
    title: "Congreso HiveYoung 2025",
    description:
      "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Revive los mejores momentos, speakers, conversatorios, talleres y bandas en vivo.",
    images: [
      {
        url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
        width: 1200,
        height: 630,
        alt: "Congreso HiveYoung 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Congreso HiveYoung 2025",
    description: "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Revive los mejores momentos, speakers, conversatorios, talleres y bandas en vivo.",
    images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
  },
};

export default function Congreso2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

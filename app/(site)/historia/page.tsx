import type { Metadata } from "next";
import HistoriaClient from "./HistoriaClient";

export const metadata: Metadata = {
    title: "Nuestra Historia",
    description:
        "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil en Chile.",
    alternates: {
        canonical: "https://hiveyoung.org/historia",
    },
    openGraph: {
        title: "Nuestra Historia — HiveYoung",
        description:
            "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
                width: 1200,
                height: 630,
                alt: "Nuestra Historia - HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nuestra Historia — HiveYoung",
        description: "Conoce el origen y la evolución de HiveYoung, transformando el ecosistema juvenil.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
    },
};

export default function HistoriaPage() {
    return <HistoriaClient />;
}

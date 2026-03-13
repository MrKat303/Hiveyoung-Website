import type { Metadata } from "next";
import EquipoClient from "./EquipoClient";

export const metadata: Metadata = {
    title: "Nuestro Equipo",
    description:
        "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social en Chile.",
    alternates: {
        canonical: "https://hiveyoung.org/equipo",
    },
    openGraph: {
        title: "Nuestro Equipo — HiveYoung",
        description:
            "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
                width: 1200,
                height: 630,
                alt: "Nuestro Equipo - HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nuestro Equipo — HiveYoung",
        description: "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
    },
};

export default function EquipoPage() {
    return <EquipoClient />;
}

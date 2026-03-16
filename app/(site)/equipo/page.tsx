import type { Metadata } from "next";
import EquipoClient from "./EquipoClient";
import { direccionEjecutiva } from "@/data/equipo";

export const metadata: Metadata = {
    title: "Nuestro Equipo",
    description:
        "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social en Chile.",
    alternates: {
        canonical: "https://hiveyoung.org/equipo",
    },
    openGraph: {
        title: "Nuestro Equipo | HiveYoung",
        description:
            "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Nuestro Equipo | HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nuestro Equipo | HiveYoung",
        description: "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png"],
    },
};

const equipoJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dirección Ejecutiva HiveYoung",
    "description": "Equipo ejecutivo de HiveYoung, jóvenes líderes que dirigen la organización juvenil.",
    "url": "https://hiveyoung.org/equipo",
    "itemListElement": direccionEjecutiva.map((miembro, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Person",
            "name": miembro.nombre,
            "jobTitle": miembro.cargo,
            "worksFor": {
                "@type": "Organization",
                "name": "HiveYoung",
                "url": "https://hiveyoung.org"
            },
            ...(miembro.img ? { "image": miembro.img } : {}),
            ...(miembro.linkedin && miembro.linkedin !== "https://linkedin.com/" ? { "sameAs": miembro.linkedin } : {})
        }
    }))
};

export default function EquipoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(equipoJsonLd) }}
            />
            <EquipoClient />
        </>
    );
}

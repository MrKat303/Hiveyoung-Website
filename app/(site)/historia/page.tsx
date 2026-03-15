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

const historyImagesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": 6,
    "itemListElement": [
        {
            "@type": "ImageObject",
            "position": 1,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
            "name": "Donde todo comenzó - Fundadores de HiveYoung",
            "description": "Cristian Suárez, Lucas Galleguillos y Vicente Olguín, fundadores de HiveYoung en el Instituto Nacional."
        },
        {
            "@type": "ImageObject",
            "position": 2,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png",
            "name": "Primeros Pasos - HiveYoung",
            "description": "Benjamín Inzunza, Lucas Galleguillos y Cristian Suárez en los inicios de HiveYoung."
        },
        {
            "@type": "ImageObject",
            "position": 3,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
            "name": "Construyendo algo real - Equipo HiveYoung",
            "description": "Trabajo en equipo y planificación del proyecto HiveYoung."
        },
        {
            "@type": "ImageObject",
            "position": 4,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
            "name": "Speakers Congreso HiveYoung y Organizadores",
            "description": "Marcelo Guital, Francisco Ackermann, Gina Ocqueteau junto a los organizadores en el Congreso HiveYoung."
        }
    ]
};

export default function HistoriaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(historyImagesSchema) }}
            />
            <HistoriaClient />
        </>
    );
}

import type { Metadata } from "next";
import HistoriaClient from "./HistoriaClient";

export const metadata: Metadata = {
    title: "Nuestra Historia",
    description:
        "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil en Chile.",
    alternates: {
        canonical: "https://www.hiveyoung.org/historia",
    },
    openGraph: {
        title: "Nuestra Historia | HiveYoung",
        description:
            "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Nuestra Historia | HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nuestra Historia | HiveYoung",
        description: "Conoce el origen y la evolución de HiveYoung, transformando el ecosistema juvenil.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
    },
};

const historyImagesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": 5,
    "itemListElement": [
        {
            "@type": "ImageObject",
            "position": 1,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
            "name": "Donde todo comenzó | Fundadores de HiveYoung",
            "description": "Cristian Suárez, Lucas Galleguillos y Vicente Olguín, cofundadores de HiveYoung."
        },
        {
            "@type": "ImageObject",
            "position": 2,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png",
            "name": "Primeros Pasos | HiveYoung",
            "description": "El equipo de HiveYoung en sus primeros pasos."
        },
        {
            "@type": "ImageObject",
            "position": 3,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
            "name": "Construyendo algo real | Equipo HiveYoung",
            "description": "El equipo de HiveYoung trabajando en la planificación del Congreso."
        },
        {
            "@type": "ImageObject",
            "position": 4,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
            "name": "Speakers Congreso HiveYoung y Organizadores",
            "description": "Speakers Congreso HiveYoung junto a sus organizadores (Cristian Suarez, Lucas Galleguillos y Vicente Olguin)"
        },
        {
            "@type": "ImageObject",
            "position": 5,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681115/WhatsApp_Image_2026-03-16_at_14.06.02_b61imy.jpg",
            "name": "Impacto Masivo | Voluntarios HiveYoung",
            "description": "El Congreso HiveYoung reunió a más de 2000 estudiantes. Voluntarios de HiveYoung en acción."
        }
    ]
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://www.hiveyoung.org"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Nuestra Historia",
            "item": "https://www.hiveyoung.org/historia"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <HistoriaClient />
        </>
    );
}

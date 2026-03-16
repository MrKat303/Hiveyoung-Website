import type { Metadata } from "next";
import SomosClient from "./SomosClient";

export const metadata: Metadata = {
    title: "Quiénes Somos",
    description:
        "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
    alternates: {
        canonical: "https://hiveyoung.org/somos",
    },
    openGraph: {
        title: "Quiénes Somos | HiveYoung",
        description:
            "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Quiénes Somos | HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Quiénes Somos | HiveYoung",
        description: "Conoce la historia, misión y visión de HiveYoung.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
    },
};

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Quiénes Somos | HiveYoung",
    "url": "https://hiveyoung.org/somos",
    "description": "HiveYoung es una organización juvenil que capta, conecta e impulsa a las nuevas generaciones, empoderándolas para desarrollar sus habilidades y convertirse en agentes de cambio.",
    "mainEntity": {
        "@type": "Organization",
        "name": "HiveYoung",
        "url": "https://hiveyoung.org",
        "logo": "https://hiveyoung.org/Logo.svg",
        "foundingDate": "2024",
        "foundingLocation": {
            "@type": "Place",
            "name": "Santiago, Chile"
        },
        "description": "Principal articulador del ecosistema juvenil en Chile y Latinoamérica. Inspiramos a la juventud a desafiar sus límites, empoderándola para desarrollar sus habilidades y pasiones, y así formar agentes de cambio capaces de generar un impacto positivo en sus comunidades.",
        "mission": "Inspirar a la juventud a desafiar sus límites, empoderándola para desarrollar sus habilidades y pasiones, y así formar agentes de cambio capaces de generar un impacto positivo en sus comunidades.",
        "sameAs": [
            "https://www.instagram.com/hiveyoung.cl/",
            "https://cl.linkedin.com/company/hiveyoung"
        ]
    }
};

export default function SomosPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            <SomosClient />
        </>
    );
}

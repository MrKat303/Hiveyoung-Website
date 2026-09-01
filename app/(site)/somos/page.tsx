import type { Metadata } from "next";
import SomosClient from "./SomosClient";
import { getOpenGraphImage } from "@/data/open-graph";

export const metadata: Metadata = {
    title: "Quiénes Somos",
    description:
        "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
    alternates: {
        canonical: "https://www.hiveyoung.org/somos",
    },
    openGraph: {
        type: "website",
        locale: "es_CL",
        siteName: "HiveYoung",
        url: "https://www.hiveyoung.org/somos",
        title: "Quiénes Somos | HiveYoung",
        description:
            "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
        images: [
            {
                url: getOpenGraphImage("somos"),
                width: 1200,
                height: 630,
                alt: "Comunidad de jóvenes que forma parte de HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Quiénes Somos | HiveYoung",
        description: "Conoce la historia, misión y visión de HiveYoung.",
        images: [{
            url: getOpenGraphImage("somos"),
            alt: "Comunidad de jóvenes que forma parte de HiveYoung",
        }],
    },
};

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Quiénes Somos | HiveYoung",
    "url": "https://www.hiveyoung.org/somos",
    "description": "HiveYoung es una organización juvenil que capta, conecta e impulsa a las nuevas generaciones, empoderándolas para desarrollar sus habilidades y convertirse en agentes de cambio.",
    "mainEntity": {
        "@type": "Organization",
        "name": "HiveYoung",
        "url": "https://www.hiveyoung.org",
        "logo": "https://www.hiveyoung.org/Logo.svg",
        "foundingDate": "2024",
        "foundingLocation": {
            "@type": "Place",
            "name": "Santiago, Chile"
        },
        "description": "Principal articulador del ecosistema juvenil en Chile y Latinoamérica. Nuestra Misión: Inspirar a la juventud a desafiar sus límites, empoderándola para desarrollar sus habilidades y pasiones, y así formar agentes de cambio capaces de generar un impacto positivo en sus comunidades. Nuestra Visión: Ser el principal articulador del ecosistema juvenil y la plataforma líder en Latinoamérica que impulsa a una nueva generación de agentes de cambio y proyectos de impacto. Valores Core: Colaboración (construimos puentes y alianzas estratégicas), Diversidad (valoramos y respetamos la diversidad en todas sus formas), Compromiso (pasión y responsabilidad en nuestra causa) y Creatividad e Innovación (desafiamos paradigmas y buscamos soluciones disruptivas).",
        "slogan": "Únete a la comunidad que crea el cambio",
        "knowsAbout": [
            "Liderazgo Juvenil",
            "Emprendimiento Social",
            "Ecosistema de Innovación",
            "Colaboración Estratégica",
            "Impacto Social"
        ],
        "brand": {
            "@type": "Brand",
            "name": "HiveYoung",
            "description": "Nuestra Misión: Inspirar a la juventud a desafiar sus límites. Basados en Colaboración, Diversidad, Compromiso y Creatividad disruptiva."
        },
        "sameAs": [
            "https://www.instagram.com/hiveyoung.cl/",
            "https://cl.linkedin.com/company/hiveyoung"
        ]
    }
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
            "name": "Quiénes Somos",
            "item": "https://www.hiveyoung.org/somos"
        }
    ]
};

export default function SomosPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <SomosClient />
        </>
    );
}

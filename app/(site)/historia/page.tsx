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
            "description": "Cristian Suárez, Lucas Galleguillos y Vicente Olguín, cofundadores de HiveYoung."
        },
        {
            "@type": "ImageObject",
            "position": 2,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png",
            "name": "Primeros Pasos - HiveYoung",
            "description": "El equipo de HiveYoung en sus primeros pasos."
        },
        {
            "@type": "ImageObject",
            "position": 3,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
            "name": "Construyendo algo real - Equipo HiveYoung",
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
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016921/IMG-20250519-WA0111_yk5dze.jpg",
            "name": "Lanzamiento Congreso HiveYoung 2025",
            "description": "Lanzamiento oficial del Congreso HiveYoung 2025 con gran convocatoria"
        },
        {
            "@type": "ImageObject",
            "position": 6,
            "url": "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016902/IMG-20250930-WA0098_yw5tmg.jpg",
            "name": "Equipo HiveYoung en Summit País Digital",
            "description": "El equipo de HiveYoung participando en el Summit de País Digital 2025."
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
            {/* SEO Gallery: Visible to crawlers but not to users */}
            <div style={{ display: 'none' }} aria-hidden="true">
                <h1>Nuestra Historia - HiveYoung</h1>
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png" alt="Cristian Suárez, Lucas Galleguillos y Vicente Olguín, cofundadores de HiveYoung." />
                <p>Cristian Suárez, Lucas Galleguillos y Vicente Olguín, cofundadores de HiveYoung.</p>
                
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png" alt="El equipo de HiveYoung en sus primeros pasos" />
                <p>El equipo de HiveYoung en sus primeros pasos.</p>
                
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png" alt="El equipo de HiveYoung trabajando en la planificación del Congreso" />
                <p>El equipo de HiveYoung trabajando en la planificación del Congreso</p>
                
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg" alt="Speakers Congreso HiveYoung junto a sus organizadores (Cristian Suarez, Lucas Galleguillos y Vicente Olguin)" />
                <p>Speakers Congreso HiveYoung junto a sus organizadores (Cristian Suarez, Lucas Galleguillos y Vicente Olguin)</p>
                
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016921/IMG-20250519-WA0111_yk5dze.jpg" alt="Lanzamiento oficial del Congreso HiveYoung 2025 con gran convocatoria" />
                <p>Lanzamiento oficial del Congreso HiveYoung 2025 con gran convocatoria</p>
                
                <img src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016902/IMG-20250930-WA0098_yw5tmg.jpg" alt="Equipo HiveYoung en Summit País Digital" />
                <p>El equipo de HiveYoung participando en el Summit de País Digital 2025.</p>
            </div>
            <HistoriaClient />
        </>
    );
}

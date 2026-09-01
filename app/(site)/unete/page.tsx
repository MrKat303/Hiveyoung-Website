import type { Metadata } from "next";
import UneteClient from "./UneteClient";

export const metadata: Metadata = {
    title: "Únete",
    description:
        "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile.",
    alternates: {
        canonical: "https://www.hiveyoung.org/unete",
    },
    openGraph: {
        title: "Únete a HiveYoung",
        description:
            "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Únete a HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Únete a HiveYoung",
        description: "Sé parte de la comunidad de líderes juveniles que está transformando Chile.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
    },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Quiénes pueden unirse a HiveYoung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jóvenes estudiantes de enseñanza media, egresados o universitarios interesados en participar activamente en la organización."
      }
    },
    {
      "@type": "Question",
      "name": "¿Existe un límite de edad para unirse a HiveYoung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Ideal jóvenes entre 14 y 29 años."
      }
    },
    {
      "@type": "Question",
      "name": "¿Tiene algún costo unirse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. La participación es completamente gratuita."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué formas puedo participar en HiveYoung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Integrando equipos de trabajo, participando como voluntario/a en actividades, colaborando en proyectos y asistiendo a instancias formativas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Debo tener experiencia o alguna habilidad específica para participar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Solo se requieren ganas de aprender, participar y aportar."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué obtengo al unirme a HiveYoung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Experiencia en proyectos reales, desarrollo de habilidades personales y profesionales, formación y formar parte de una comunidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo debo dedicar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La dedicación es flexible y depende de tu disponibilidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo participar desde cualquier ciudad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Hay actividades presenciales y virtuales."
      }
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
      "name": "Únete",
      "item": "https://www.hiveyoung.org/unete"
    }
  ]
};

export default function UnetePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <UneteClient />
        </>
    );
}

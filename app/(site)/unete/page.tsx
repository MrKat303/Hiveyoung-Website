import type { Metadata } from "next";
import UneteClient from "./UneteClient";

export const metadata: Metadata = {
    title: "Únete",
    description:
        "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile. Postula aquí.",
    alternates: {
        canonical: "https://hiveyoung.org/unete",
    },
    openGraph: {
        title: "Únete a HiveYoung",
        description:
            "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile.",
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
            <UneteClient />
        </>
    );
}

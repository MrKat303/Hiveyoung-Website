import Congreso2025Client from './Congreso2025Client';

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "¿Quiénes pueden asistir?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "El evento está abierto a todos los jóvenes escolares y universitarios, emprendedores y personas interesadas en aprender."
            }
        },
        {
            "@type": "Question",
            "name": "¿Tiene costo la entrada?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "El Congreso HiveYoung es un evento gratuito, pero requiere inscripción previa ya que los cupos son limitados."
            }
        },
        {
            "@type": "Question",
            "name": "¿Es presencial u online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Es un evento 100% presencial."
            }
        },
        {
            "@type": "Question",
            "name": "¿Cuánto dura el congreso?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "El congreso se desarrolla durante una jornada completa, con una programación continua de charlas, talleres, conversatorios y actividades artísticas."
            }
        }
    ]
};

const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Congreso HiveYoung 2025",
    description:
        "Congreso HiveYoung 2025, realizado el 7 y 8 de julio de 2025 en Santiago de Chile. Speakers, conversatorios, talleres y bandas en vivo.",
    startDate: "2025-07-07T08:00:00-04:00",
    endDate: "2025-07-08T18:00:00-04:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
        "@type": "Place",
        name: "Centro de Extensión Instituto Nacional (CEINA)",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Santiago",
            addressCountry: "CL",
        },
    },
    organizer: {
        "@type": "Organization",
        name: "HiveYoung",
        url: "https://www.hiveyoung.org",
    },
    image:
        "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
};

export default function CongresoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
            />
            <Congreso2025Client />
        </>
    );
}

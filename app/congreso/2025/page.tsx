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
        "Congreso HiveYoung 2025: el evento juvenil más importante de Chile. Speakers, conversatorios, talleres y bandas en vivo.",
    startDate: "2025-07-07",
    endDate: "2025-07-08",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
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
        url: "https://hiveyoung.org",
    },
    image:
        "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
    },
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

import CongresoClient from './CongresoClient';
import { speakers } from '@/data/speakers';

const congresoJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Congreso HiveYoung",
  description:
    "El punto de encuentro de la nueva generación en Chile. Liderazgo, tecnología, emprendimiento y red de conexión.",
  url: "https://congreso.hiveyoung.org",
  startDate: "2025-07-07",
  endDate: "2025-07-08",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Centro de Extensión Instituto Nacional (CEINA)",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Arturo Prat 33",
      addressLocality: "Santiago",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "HiveYoung",
    url: "https://hiveyoung.org",
  },
  offers: {
    "@type": "Offer",
    url: "https://congreso.hiveyoung.org",
    price: "0",
    priceCurrency: "CLP",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
  },
  performer: speakers.map((s) => ({
    "@type": "Person",
    name: s.name,
    jobTitle: s.role,
    worksFor: {
      "@type": "Organization",
      name: s.company,
    },
    image: s.img,
  })),
  image:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773377243/Red_Simple_Company_Logo_td3up0.png",
};

export default function CongresoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(congresoJsonLd) }}
      />
      <CongresoClient />
    </>
  );
}

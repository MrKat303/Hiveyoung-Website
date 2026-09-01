import CongresoClient from './CongresoClient';
import { speakers } from '@/data/speakers';

const congresoJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Congreso HiveYoung 2025",
  description:
    "Congreso HiveYoung 2025, realizado el 7 y 8 de julio de 2025 en Santiago de Chile.",
  url: "https://congreso.hiveyoung.org",
  startDate: "2025-07-07T08:00:00-04:00",
  endDate: "2025-07-08T18:00:00-04:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
    url: "https://www.hiveyoung.org",
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

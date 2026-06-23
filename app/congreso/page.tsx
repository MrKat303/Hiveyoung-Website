import CongresoClient from './CongresoClient';

const congresoJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Congreso HiveYoung",
  description:
    "El punto de encuentro de la nueva generación en Chile. Liderazgo, tecnología, emprendimiento y red de conexión.",
  url: "https://congreso.hiveyoung.org",
  organizer: {
    "@type": "Organization",
    name: "HiveYoung",
    url: "https://hiveyoung.org",
  },
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
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

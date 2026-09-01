import type { Metadata } from "next";
import EquipoClient from "./EquipoClient";
import { direccionEjecutiva } from "@/data/equipo";

export const metadata: Metadata = {
    title: "Nuestro Equipo",
    description:
        "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social en Chile.",
    alternates: {
        canonical: "https://www.hiveyoung.org/equipo",
    },
    openGraph: {
        type: "website",
        locale: "es_CL",
        siteName: "HiveYoung",
        url: "https://www.hiveyoung.org/equipo",
        title: "Nuestro Equipo | HiveYoung",
        description:
            "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782255806/Comunidad_HiveYoung_oounbh.jpg",
                width: 1200,
                height: 630,
                alt: "Equipo juvenil de HiveYoung reunido en comunidad",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nuestro Equipo | HiveYoung",
        description: "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil.",
        images: [{
            url: "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782255806/Comunidad_HiveYoung_oounbh.jpg",
            alt: "Equipo y comunidad de jóvenes de HiveYoung",
        }],
    },
};

const equipoJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dirección Ejecutiva HiveYoung",
    "description": "Equipo ejecutivo de HiveYoung, jóvenes líderes que dirigen la organización juvenil.",
    "url": "https://www.hiveyoung.org/equipo",
    "itemListElement": direccionEjecutiva.map((miembro, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Person",
            "name": miembro.nombre,
            "jobTitle": miembro.cargo,
            "description": miembro.descripcion,
            "worksFor": {
                "@type": "Organization",
                "name": "HiveYoung",
                "url": "https://www.hiveyoung.org"
            },
            ...(miembro.img ? { "image": miembro.img } : {}),
            ...(miembro.linkedin && miembro.linkedin !== "https://linkedin.com/" ? { "sameAs": miembro.linkedin } : {})
        }
    }))
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
      "name": "Nuestro Equipo",
      "item": "https://www.hiveyoung.org/equipo"
    }
  ]
};

export default function EquipoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(equipoJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <EquipoClient />
        </>
    );
}

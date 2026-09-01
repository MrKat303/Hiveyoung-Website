import type { Metadata } from "next";
import AdvisoryBoardClient from "./AdvisoryBoardClient";
import { advisors } from "@/data/advisory";
import { getOpenGraphImage } from "@/data/open-graph";

export const metadata: Metadata = {
    title: "Advisory Board",
    description:
        "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
    alternates: {
        canonical: "https://www.hiveyoung.org/advisory-board",
    },
    openGraph: {
        type: "website",
        locale: "es_CL",
        siteName: "HiveYoung",
        url: "https://www.hiveyoung.org/advisory-board",
        title: "Advisory Board | HiveYoung",
        description:
            "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
        images: [
            {
                url: getOpenGraphImage("advisory"),
                width: 1200,
                height: 630,
                alt: "Integrantes de HiveYoung durante un encuentro con Marcelo Guital",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Advisory Board | HiveYoung",
        description: "Conoce a los líderes estratégicos que impulsan la visión de HiveYoung.",
        images: [{
            url: getOpenGraphImage("advisory"),
            alt: "Encuentro de HiveYoung con Marcelo Guital",
        }],
    },
};

const advisoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Advisory Board HiveYoung",
    "description": "Líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
    "url": "https://www.hiveyoung.org/advisory-board",
    "numberOfItems": advisors.length,
    "itemListElement": advisors.map((advisor, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Person",
            "name": advisor.name,
            "jobTitle": advisor.role,
            "image": advisor.img,
            "worksFor": {
                "@type": "Organization",
                "name": advisor.institution,
            },
            "memberOf": {
                "@type": "Organization",
                "name": "HiveYoung",
                "url": "https://www.hiveyoung.org",
            },
            ...(advisor.linkedin ? { "sameAs": advisor.linkedin } : {}),
        },
    })),
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
      "name": "Advisory Board",
      "item": "https://www.hiveyoung.org/advisory-board"
    }
  ]
};

export default function AdvisoryBoardPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(advisoryJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <AdvisoryBoardClient />
        </>
    );
}

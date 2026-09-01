import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";
import { getOpenGraphImage } from "@/data/open-graph";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros. Estamos listos para escucharte.",
    alternates: {
        canonical: "https://www.hiveyoung.org/contacto",
    },
    openGraph: {
        type: "website",
        locale: "es_CL",
        siteName: "HiveYoung",
        url: "https://www.hiveyoung.org/contacto",
        title: "Contacto | HiveYoung",
        description:
            "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros.",
        images: [
            {
                url: getOpenGraphImage("contacto"),
                width: 1200,
                height: 630,
                alt: "Fundadores de HiveYoung durante una entrevista de radio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contacto | HiveYoung",
        description: "¿Quieres colaborar o tienes alguna duda? Contáctanos.",
        images: [{
            url: getOpenGraphImage("contacto"),
            alt: "HiveYoung participando en una entrevista de radio",
        }],
    },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto | HiveYoung",
  "url": "https://www.hiveyoung.org/contacto",
  "description": "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros. Estamos listos para escucharte.",
  "mainEntity": {
    "@type": "Organization",
    "name": "HiveYoung",
    "url": "https://www.hiveyoung.org",
    "email": "hiveyoung@gmail.com",
    "telephone": "+56 9 8392 4500",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56 9 8392 4500",
      "contactType": "customer service",
      "email": "hiveyoung@gmail.com",
      "availableLanguage": "Spanish"
    }
  }
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
      "name": "Contacto",
      "item": "https://www.hiveyoung.org/contacto"
    }
  ]
};

export default function ContactoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ContactoClient />
        </>
    );
}

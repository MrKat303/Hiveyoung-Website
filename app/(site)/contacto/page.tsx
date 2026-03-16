import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros. Estamos listos para escucharte.",
    alternates: {
        canonical: "https://hiveyoung.org/contacto",
    },
    openGraph: {
        title: "Contacto | HiveYoung",
        description:
            "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Contacto | HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contacto | HiveYoung",
        description: "¿Quieres colaborar o tienes alguna duda? Contáctanos.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
    },
};

export default function ContactoPage() {
    return <ContactoClient />;
}

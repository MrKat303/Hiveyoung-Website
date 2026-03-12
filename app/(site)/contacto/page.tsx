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
        title: "Contacto — HiveYoung",
        description:
            "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros.",
    },
};

export default function ContactoPage() {
    return <ContactoClient />;
}

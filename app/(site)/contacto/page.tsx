import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
    title: "Contacto",
    description: "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros. Estamos listos para escucharte.",
    openGraph: {
        title: "Contacto",
        description: "¿Tienes alguna duda o quieres colaborar con HiveYoung? Ponte en contacto con nosotros. Estamos listos para escucharte.",
        url: "https://hiveyoung.cl/contacto",
    },
};

export default function ContactoPage() {
    return <ContactoClient />;
}

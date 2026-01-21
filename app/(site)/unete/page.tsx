import type { Metadata } from "next";
import UneteClient from "./UneteClient";

export const metadata: Metadata = {
    title: "Unete",
    description: "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile. Postula aquí.",
    openGraph: {
        title: "Unete",
        description: "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile. Postula aquí.",
        url: "https://hiveyoung.cl/unete",
    },
};

export default function page() {
    return <UneteClient />;
}

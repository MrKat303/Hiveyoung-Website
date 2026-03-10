import type { Metadata } from "next";
import UneteClient from "./UneteClient";

export const metadata: Metadata = {
    title: "Únete",
    description:
        "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile. Postula aquí.",
    openGraph: {
        title: "Únete a HiveYoung",
        description:
            "¿Quieres ser parte del cambio? Únete a HiveYoung y forma parte de la comunidad de líderes juveniles más grande de Chile.",
    },
};

export default function UnetePage() {
    return <UneteClient />;
}

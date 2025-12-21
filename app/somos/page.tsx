import type { Metadata } from "next";
import SomosClient from "./SomosClient";

export const metadata: Metadata = {
    title: "¿Quiénes Somos? | HiveYoung",
    description: "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil.",
    openGraph: {
        title: "¿Quiénes Somos? | HiveYoung",
        description: "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil.",
        url: "https://hiveyoung.cl/somos",
    },
};

export default function SomosPage() {
    return <SomosClient />;
}

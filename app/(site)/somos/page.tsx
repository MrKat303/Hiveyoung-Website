import type { Metadata } from "next";
import SomosClient from "./SomosClient";

export const metadata: Metadata = {
    title: "Quienes Somos",
    description: "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil.",
    openGraph: {
        title: "Quienes Somos",
        description: "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil.",
        url: "https://hiveyoung.cl/somos",
    },
};

export default function SomosPage() {
    return <SomosClient />;
}

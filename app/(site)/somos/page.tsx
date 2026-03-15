import type { Metadata } from "next";
import SomosClient from "./SomosClient";

export const metadata: Metadata = {
    title: "Quienes Somos",
    description:
        "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
    alternates: {
        canonical: "https://hiveyoung.org/somos",
    },
    openGraph: {
        title: "Quiénes Somos | HiveYoung",
        description:
            "Conoce la historia, misión y visión de HiveYoung. Somos el principal articulador del ecosistema juvenil en Chile y Latinoamérica.",
    },
};

export default function SomosPage() {
    return <SomosClient />;
}

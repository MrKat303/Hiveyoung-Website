import type { Metadata } from "next";
import HistoriaClient from "./HistoriaClient";

export const metadata: Metadata = {
    title: "Nuestra Historia",
    description:
        "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil en Chile y Latinoamérica.",
    alternates: {
        canonical: "https://hiveyoung.org/historia",
    },
    openGraph: {
        title: "Nuestra Historia — HiveYoung",
        description:
            "Conoce la historia de HiveYoung, cómo nació y quiénes han sido parte de este proyecto que transforma el ecosistema juvenil.",
    },
};

export default function HistoriaPage() {
    return <HistoriaClient />;
}

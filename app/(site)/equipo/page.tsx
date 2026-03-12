import type { Metadata } from "next";
import EquipoClient from "./EquipoClient";

export const metadata: Metadata = {
    title: "Nuestro Equipo",
    description:
        "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social en Chile y Latinoamérica.",
    alternates: {
        canonical: "https://hiveyoung.org/equipo",
    },
    openGraph: {
        title: "Nuestro Equipo — HiveYoung",
        description:
            "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
    },
};

export default function EquipoPage() {
    return <EquipoClient />;
}

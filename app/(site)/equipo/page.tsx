import type { Metadata } from "next";
import EquipoClient from "./EquipoClient";

export const metadata: Metadata = {
    title: "Nuestro Equipo | HiveYoung",
    description: "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
    openGraph: {
        title: "Nuestro Equipo | HiveYoung",
        description: "Conoce al equipo detrás de HiveYoung, jóvenes líderes comprometidos con articular el ecosistema juvenil y generar impacto social.",
        url: "https://hiveyoung.cl/equipo", // Update with your actual domain
    },
};

export default function page() {
    return <EquipoClient />;
}

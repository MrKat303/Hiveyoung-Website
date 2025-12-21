import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";

export const metadata: Metadata = {
  title: "HiveYoung | Principal articulador del ecosistema juvenil",
  description: "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
  openGraph: {
    title: "HiveYoung | Principal articulador del ecosistema juvenil",
    description: "Únete a HiveYoung, el principal articulador del ecosistema juvenil en Chile. Potencia tus habilidades, conecta con líderes y lidera el cambio.",
    url: "https://hiveyoung.cl/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* Aquí puedes agregar más secciones de la página de inicio a medida que las migremos */}
    </>
  );
}

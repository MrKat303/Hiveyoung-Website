import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nuestra Historia",
};

export default function HistoriaPage() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: "#f8f4eb" }}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#3a1b4e] uppercase">Nuestra Historia</h1>
            <p className="mt-4 text-center max-w-2xl px-4">Esta página está en construcción. Pronto conocerás más sobre el origen de HiveYoung.</p>
        </div>
    );
}

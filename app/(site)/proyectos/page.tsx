import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Proyectos",
};

export default function ProyectosPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center pt-20"
            style={{ backgroundColor: "#f8f4eb", fontFamily: "'Poppins', sans-serif" }}
        >
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#3a1b4e] uppercase tracking-tighter">
                Proyectos
            </h1>
        </div>
    );
}

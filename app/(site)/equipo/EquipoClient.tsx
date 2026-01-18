"use client";

import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import Image from "next/image";
import "./Equipo.css";
import { direccionEjecutiva, coordinadoresRegionales, directorio, Miembro } from "@/data/equipo";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EquipoPage() {
    useScrollReveal();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    const renderCard = (miembro: Miembro) => (
        <div key={miembro.id} className="equipo-card reveal">
            <div className="card-image-container">
                {miembro.img ? (
                    <Image
                        src={miembro.img}
                        alt={`${miembro.nombre} - ${miembro.cargo} HiveYoung`}
                        width={300}
                        height={300}
                        className="card-image"
                        draggable={false}
                    />
                ) : (
                    <div className="card-image-placeholder"></div>
                )}
            </div>
            <div className="card-content">
                <h3>{miembro.nombre}</h3>
                <p>{miembro.cargo}</p>
            </div>
        </div>
    );

    const renderDirectorioCard = (miembro: Miembro) => (
        <div key={miembro.id} className="directorio-card reveal">
            <div className="directorio-image-wrapper">
                {miembro.img ? (
                    <Image
                        src={miembro.img}
                        alt={`${miembro.nombre} - ${miembro.cargo} HiveYoung`}
                        fill
                        className="directorio-image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        draggable={false}
                    />
                ) : (
                    <div className="directorio-image-placeholder">
                        <span className="placeholder-initial">{miembro.nombre.charAt(0)}</span>
                    </div>
                )}
            </div>
            <div className="directorio-info-overlay">
                <h3>{miembro.nombre}</h3>
                <p>{miembro.cargo}</p>
                <div className="overlay-line"></div>
            </div>
        </div>
    );

    return (
        <div className="equipo-page">
            <header className="equipo-header reveal">
                <h1>Nuestro Equipo</h1>
                <p>El motor que impulsa el cambio juvenil.</p>
            </header>

            <div className="equipo-container">
                <section className="equipo-seccion">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Dirección Ejecutiva</h2>
                        <div className="titulo-subrayado-verde"></div>
                    </div>
                    <div className="equipo-grid">
                        {direccionEjecutiva.map(renderCard)}
                    </div>
                </section>

                <section className="equipo-seccion">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Coordinadores Regionales</h2>
                        <div className="titulo-subrayado-verde"></div>
                    </div>
                    <div className="equipo-grid">
                        {coordinadoresRegionales.map(renderCard)}
                    </div>
                </section>

                <section className="equipo-seccion directorio-section">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Directorio</h2>
                        <div className="titulo-subrayado-verde"></div>
                    </div>

                    <div className="directorio-carousel-container reveal">
                        <button className="carousel-btn prev" onClick={scrollLeft} aria-label="Anterior">
                            <ChevronLeft size={28} />
                        </button>
                        <div className="directorio-grid carousel-track" ref={scrollRef}>
                            {directorio.map(renderDirectorioCard)}
                        </div>
                        <button className="carousel-btn next" onClick={scrollRight} aria-label="Siguiente">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

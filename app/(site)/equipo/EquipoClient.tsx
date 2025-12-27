"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import Image from "next/image";
import "./Equipo.css";
import { direccionEjecutiva, coordinadoresRegionales, Miembro } from "@/data/equipo";

export default function EquipoPage() {
    useScrollReveal();

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
            </div>
        </div>
    );
}

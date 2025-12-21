"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./Equipo.css";
import { direccionEjecutiva, coordinadoresRegionales, Miembro } from "../../data/equipo";

export default function EquipoPage() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const renderCard = (miembro: Miembro) => (
        <div key={miembro.id} className="equipo-card reveal">
            <div className="card-image-container">
                {miembro.img ? (
                    <img
                        src={miembro.img}
                        alt={`${miembro.nombre} - ${miembro.cargo} HiveYoung`}
                        className="card-image"
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

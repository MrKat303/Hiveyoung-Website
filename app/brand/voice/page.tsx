"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./voice.css";

gsap.registerPlugin(ScrollTrigger);

export default function VoicePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* Hero title entrance */
    gsap.fromTo(".vc-hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", delay: 0.15 }
    );

    /* Fade sections */
    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    });

    /* Stagger grid items */
    const cards = document.querySelectorAll<HTMLElement>(".vc-pilar-card");
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".vc-pilar-grid", start: "top 85%", once: true },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />

      <div className="brand-main vc-main">
        {/* ── 1. HERO — Amarillo (#FFC100) ── */}
        <section className="vc-hero">
          <h1 className="vc-hero-title">Voice & Tone</h1>
        </section>

        {/* ── 2. INTRO ── */}
        <section className="vc-section fade-section">
          <div className="vc-inner">
            <span className="vc-overline">Comunicación · HiveYoung</span>
            <h2 className="vc-section-title">Cómo nos comunicamos</h2>
            <p className="vc-body-text">
              La voz de HiveYoung es el reflejo de nuestra comunidad: <strong>joven, apasionada,
              integradora y con visión de futuro.</strong> Escribimos y hablamos con claridad,
              cercanía y un espíritu enérgico que inspira a los líderes del mañana a actuar hoy.
            </p>
          </div>
        </section>

        {/* ── 3. PILARES DE LA VOZ ── */}
        <section className="vc-section fade-section">
          <div className="vc-inner">
            <span className="vc-overline">01 — Pilares Fundamentales</span>
            <h2 className="vc-section-title">Nuestros pilares de tono</h2>
            <p className="vc-body-text" style={{ marginBottom: "40px" }}>
              Nuestra personalidad comunicativa descansa en tres pilares que balancean la energía de la juventud con la madurez institucional.
            </p>

            <div className="vc-pilar-grid">
              <div className="vc-pilar-card">
                <div className="vc-pilar-num">01</div>
                <h3 className="vc-pilar-name">Inspiradora e Impulsora</h3>
                <p className="vc-pilar-desc">
                  Motivamos a la acción. Creemos en el potencial transformador de los jóvenes y usamos un lenguaje afirmativo que invita a liderar e innovar.
                </p>
              </div>

              <div className="vc-pilar-card">
                <div className="vc-pilar-num">02</div>
                <h3 className="vc-pilar-name">Clara y Profesional</h3>
                <p className="vc-pilar-desc">
                  Evitamos la complejidad innecesaria. Nos expresamos con propiedad y precisión técnica para asegurar la confianza de aliados, empresas e instituciones.
                </p>
              </div>

              <div className="vc-pilar-card">
                <div className="vc-pilar-num">03</div>
                <h3 className="vc-pilar-name">Cercana y Empática</h3>
                <p className="vc-pilar-desc">
                  Hablamos al mismo nivel. Valoramos la inclusión y la diversidad regional en Latinoamérica, promoviendo espacios donde cada voz es escuchada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. GUÍA DE APLICACIÓN PRÁCTICA ── */}
        <section className="vc-section fade-section">
          <div className="vc-inner">
            <span className="vc-overline">02 — Guía Práctica</span>
            <h2 className="vc-section-title">Ejemplos de Redacción</h2>
            <p className="vc-body-text" style={{ marginBottom: "32px" }}>
              La diferencia entre cómo nos comunicamos y cómo no debemos hacerlo:
            </p>

            <div className="vc-table-wrapper">
              <table className="vc-table">
                <thead>
                  <tr>
                    <th>Situación</th>
                    <th className="th-do">Qué Decir (Do)</th>
                    <th className="th-dont">Qué Evitar (Don't)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Llamado a la acción</strong></td>
                    <td className="td-do">"Únete a la red y lidera el cambio hoy mismo."</td>
                    <td className="td-dont">"Se solicita a los jóvenes registrarse a la brevedad."</td>
                  </tr>
                  <tr>
                    <td><strong>Explicar nuestra labor</strong></td>
                    <td className="td-do">"Conectamos el talento de la juventud con oportunidades reales."</td>
                    <td className="td-dont">"Somos un hub que maximiza sinergias inter-organizacionales."</td>
                  </tr>
                  <tr>
                    <td><strong>Relación institucional</strong></td>
                    <td className="td-do">"Colaboramos para visibilizar el ecosistema de innovación juvenil."</td>
                    <td className="td-dont">"Brindamos un service-desk corporativo para el target juvenil."</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* NAV FOOTER */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "40px", marginTop: "56px", borderTop: "1px solid var(--border)" }}>
              <Link href="/brand" className="next-page-link">
                Volver al Inicio →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

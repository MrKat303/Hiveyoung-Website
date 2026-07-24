"use client";

import React, { useRef } from "react";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./ilustraciones.css";

gsap.registerPlugin(ScrollTrigger);

const ILLUSTRATION_STYLES = [
  {
    name: "Editorial Flat",
    desc: "Formas geométricas limpias, paleta de marca reducida. Ideal para presentaciones institucionales.",
    preview: "🟠",
    bg: "#FFF3F0",
  },
  {
    name: "Line Art",
    desc: "Trazos finos con rellenos mínimos de color de marca. Elegante y versátil para redes sociales.",
    preview: "📐",
    bg: "#F0F7FF",
  },
  {
    name: "Collage Textured",
    desc: "Capas de textura superpuestas, estética de revista contemporánea. Para campañas de alto impacto.",
    preview: "🎨",
    bg: "#F3FFF5",
  },
];

const ILLUSTRATION_RULES = [
  {
    icon: "🎨",
    title: "Paleta de marca",
    text: "Toda ilustración debe usar exclusivamente los colores primarios y secundarios del sistema HiveYoung.",
  },
  {
    icon: "✏️",
    title: "Trazo consistente",
    text: "El grosor de línea debe ser proporcional al tamaño de la pieza. No mezclar estilos de ilustración en una misma publicación.",
  },
  {
    icon: "📐",
    title: "Espaciado y limpieza",
    text: "Las ilustraciones deben respirar. Evita la saturación visual: menos elementos bien ejecutados comunican mejor.",
  },
  {
    icon: "🔤",
    title: "Tipografía integrada",
    text: "Al integrar texto en ilustraciones, usa únicamente Giabe Regular o Agrandir. Nunca fuentes externas al sistema.",
  },
];

export default function IlustracionesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".il-hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", delay: 0.15 }
    );
    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true } }
      );
    });
    gsap.utils.toArray<HTMLElement>(".il-style-card").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".il-style-grid", start: "top 85%", once: true } }
      );
    });
  }, { scope: containerRef });

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />
      <div className="brand-main il-main">

        {/* ── 1. HERO ── */}
        <section className="il-hero">
          <h1 className="il-hero-title">Ilustraciones</h1>
        </section>

        {/* ── 2. FILOSOFÍA ── */}
        <section className="il-section fade-section">
          <div className="il-inner">
            <span className="il-overline">Visual Language · HiveYoung</span>
            <h2 className="il-section-title">La imagen que comunica</h2>
            <p className="il-body-text">
              Las ilustraciones de HiveYoung amplían el lenguaje de la marca más allá del texto y la fotografía.
              Son una extensión viva de los colores, las formas y los valores de la organización —
              <strong> dinámicas, inclusivas y llenas de energía juvenil.</strong>
            </p>
          </div>
        </section>

        {/* ── 3. ESTILOS ── */}
        <section className="il-section fade-section">
          <div className="il-inner">
            <span className="il-overline">01 — Estilos Oficiales</span>
            <h2 className="il-section-title">Tres lenguajes visuales</h2>
            <p className="il-body-text">
              HiveYoung reconoce tres estilos de ilustración autorizados, cada uno con un propósito y contexto específico.
            </p>
            <div className="il-style-grid">
              {ILLUSTRATION_STYLES.map((style, i) => (
                <div key={i} className="il-style-card">
                  <div className="il-style-card-preview" style={{ background: style.bg }}>
                    {style.preview}
                  </div>
                  <div className="il-style-card-body">
                    <div className="il-style-card-name">{style.name}</div>
                    <div className="il-style-card-desc">{style.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. REGLAS ── */}
        <section className="il-section fade-section">
          <div className="il-inner">
            <span className="il-overline">02 — Principios de Uso</span>
            <h2 className="il-section-title">Reglas de la ilustración</h2>
            <p className="il-body-text">
              Para garantizar la coherencia visual en toda comunicación, aplica estos principios sin excepción.
            </p>
            <div className="il-rules-grid">
              {ILLUSTRATION_RULES.map((rule, i) => (
                <div key={i} className="il-rule-row">
                  <div className="il-rule-icon">{rule.icon}</div>
                  <div>
                    <div className="il-rule-title">{rule.title}</div>
                    <div className="il-rule-text">{rule.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. DO / DON'T ── */}
        <section className="il-section fade-section">
          <div className="il-inner">
            <span className="il-overline">03 — Guía de Aplicación</span>
            <h2 className="il-section-title">Qué hacer y qué evitar</h2>
            <div className="il-do-dont">
              <div className="il-do">
                <div className="il-do-preview">✅</div>
                <div className="il-do-label">✓ Correcto</div>
                <div className="il-do-text">Usar ilustraciones con la paleta oficial, integrar correctamente la tipografía de marca y mantener un estilo visual uniforme dentro de una campaña.</div>
              </div>
              <div className="il-dont">
                <div className="il-dont-preview">❌</div>
                <div className="il-dont-label">✗ Incorrecto</div>
                <div className="il-dont-text">Mezclar estilos de ilustración distintos, usar colores fuera de la paleta de marca, o aplicar tipografías no autorizadas dentro de las piezas ilustradas.</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

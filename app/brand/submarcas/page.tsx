"use client";

import React, { useRef } from "react";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./submarcas.css";

gsap.registerPlugin(ScrollTrigger);

const SUBMARCAS = [
  {
    tag: "Eventos",
    name: "HiveYoung Congreso",
    desc: "El evento cumbre de liderazgo juvenil en Chile y Latinoamérica. Una plataforma de inspiración, conexión y acción colectiva para las nuevas generaciones.",
    bgColor: "#3A1B4E",
    accentColor: "#FFC100",
    href: "https://congreso.hiveyoung.org",
  },
  {
    tag: "Formación",
    name: "HiveYoung Academy",
    desc: "El programa de formación de habilidades de liderazgo, emprendimiento e innovación para jóvenes que quieren crecer y transformar su entorno.",
    bgColor: "#529CE8",
    accentColor: "#FFFFFF",
    href: "#",
  },
  {
    tag: "Comunidad",
    name: "HiveYoung Network",
    desc: "La red de líderes juveniles más activa de la región. Conexión, mentoría y oportunidades entre jóvenes que están construyendo el futuro.",
    bgColor: "#2EB67D",
    accentColor: "#FFFFFF",
    href: "#",
  },
  {
    tag: "Impacto",
    name: "HiveYoung Labs",
    desc: "El espacio de experimentación donde las ideas de los jóvenes se convierten en proyectos reales con impacto en sus comunidades.",
    bgColor: "#EE6352",
    accentColor: "#FFFFFF",
    href: "#",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Coherencia de marca",
    text: "Toda submarca hereda los colores, tipografía y valores de HiveYoung. El sistema es uno, las expresiones son múltiples.",
  },
  {
    num: "02",
    title: "Identidad propia",
    text: "Cada submarca tiene un color acento y una voz tonal propios, pero siempre dentro del ecosistema visual autorizado.",
  },
  {
    num: "03",
    title: "Jerarquía clara",
    text: "HiveYoung es siempre la marca madre. Las submarcas se subordinan visualmente al sistema pero pueden brillar en sus contextos.",
  },
];

export default function SubmarcasPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".sm-hero-title",
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
    gsap.utils.toArray<HTMLElement>(".sm-brand-card").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".sm-brand-grid", start: "top 85%", once: true } }
      );
    });
  }, { scope: containerRef });

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />
      <div className="brand-main sm-main">

        {/* ── 1. HERO ── */}
        <section className="sm-hero">
          <h1 className="sm-hero-title">Submarcas</h1>
        </section>

        {/* ── 2. INTRO ── */}
        <section className="sm-section fade-section">
          <div className="sm-inner">
            <span className="sm-overline">Brand Architecture · HiveYoung</span>
            <h2 className="sm-section-title">Un ecosistema, muchas voces</h2>
            <p className="sm-body-text">
              HiveYoung es el hub central del que nacen iniciativas, programas y plataformas con identidad propia.
              Cada <strong>submarca</strong> tiene una misión específica dentro del ecosistema juvenil —
              unidas por los mismos valores, diferenciadas por su propósito.
            </p>
          </div>
        </section>

        {/* ── 3. SUBMARCAS GRID ── */}
        <section className="sm-section fade-section">
          <div className="sm-inner">
            <span className="sm-overline">01 — Iniciativas Oficiales</span>
            <h2 className="sm-section-title">Las marcas del ecosistema</h2>

            <div className="sm-brand-grid">
              {SUBMARCAS.map((brand, i) => (
                <a
                  key={i}
                  className="sm-brand-card"
                  href={brand.href}
                  target={brand.href !== "#" ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div className="sm-brand-card-hero" style={{ background: brand.bgColor }}>
                    <span className="sm-brand-card-hero-text">{brand.name.replace("HiveYoung ", "")}</span>
                    {/* Decorative ring */}
                    <div style={{
                      position: "absolute",
                      right: "-20px",
                      bottom: "-20px",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      border: `2px solid ${brand.accentColor}`,
                      opacity: 0.2,
                    }} />
                    <div style={{
                      position: "absolute",
                      right: "20px",
                      top: "20px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: brand.accentColor,
                      opacity: 0.3,
                    }} />
                  </div>
                  <div className="sm-brand-card-body">
                    <div className="sm-brand-card-tag" style={{ color: brand.bgColor }}>{brand.tag}</div>
                    <div className="sm-brand-card-name">{brand.name}</div>
                    <div className="sm-brand-card-desc">{brand.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. PRINCIPIOS DE ARQUITECTURA ── */}
        <section className="sm-section fade-section">
          <div className="sm-inner">
            <span className="sm-overline">02 — Arquitectura de Marca</span>
            <h2 className="sm-section-title">Cómo conviven las marcas</h2>
            <p className="sm-body-text">
              Las submarcas de HiveYoung siguen principios claros que garantizan la coherencia del ecosistema sin limitar su identidad propia.
            </p>
            <div className="sm-principles">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="sm-principle">
                  <div className="sm-principle-num">{p.num}</div>
                  <div className="sm-principle-title">{p.title}</div>
                  <div className="sm-principle-text">{p.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

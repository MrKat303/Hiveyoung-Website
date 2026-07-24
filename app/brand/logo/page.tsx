"use client";

import React, { useRef } from "react";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./logo.css";

gsap.registerPlugin(ScrollTrigger);

const LOGO_CELLS = [
  { src: "/logo-white.svg", bg: "#080810", label: "Sobre negro", textColor: "#ffffff" },
  { src: "/Logo.svg",       bg: "#F4EDE4", label: "Sobre crema", textColor: "#111111" },
  { src: "/logo-white.svg", bg: "#3A1B4E", label: "Sobre púrpura", textColor: "#ffffff" },
  { src: "/logo-white.svg", bg: "#FFC100", label: "Sobre amarillo", textColor: "#111111", filter: "brightness(0)" },
];

export default function LogoPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* Hero title entrance */
    gsap.fromTo(".lg-hero-title",
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

    /* Stagger cards in logo grid */
    const cards = document.querySelectorAll<HTMLElement>(".lg-card");
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".lg-grid", start: "top 85%", once: true },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />
      <div className="brand-main lg-main">

        {/* ── 1. HERO ── */}
        <section className="lg-hero">
          <h1 className="lg-hero-title">Logo</h1>
        </section>

        {/* ── 2. FILOSOFÍA DE LA MARCA ── */}
        <section className="lg-section fade-section">
          <div className="lg-inner">
            <span className="lg-overline">Identidad Visual · HiveYoung</span>
            <h2 className="lg-section-title">El símbolo principal</h2>
            <p className="lg-body-text">
              El logotipo de HiveYoung es el elemento primordial de la identidad de marca.
              Fue diseñado para representar la conexión, la fuerza colectiva y la articulación
              del liderazgo juvenil en toda Latinoamérica.
            </p>
          </div>
        </section>

        {/* ── 3. VERSIONES DEL LOGO ── */}
        <section className="lg-section fade-section">
          <div className="lg-inner">
            <span className="lg-overline">01 — Versiones Oficiales</span>
            <h2 className="lg-section-title">Adaptabilidad de marca</h2>
            <p className="lg-body-text" style={{ marginBottom: "32px" }}>
              El logo cuenta con variaciones para desempeñarse con alto contraste sobre fondos claros, oscuros y de color.
            </p>

            <div className="lg-grid">
              {LOGO_CELLS.map((cell, i) => (
                <div key={i} className="lg-card" style={{ background: cell.bg }}>
                  <img
                    src={cell.src}
                    alt={`HiveYoung logo — ${cell.label}`}
                    className="lg-card-img"
                    style={{ filter: cell.filter }}
                  />
                  <span className="lg-card-label" style={{ color: cell.textColor }}>
                    {cell.label}
                  </span>
                </div>
              ))}
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="lg-download-row">
              <a
                id="download-logo-white-btn"
                className="lg-btn lg-btn-primary"
                href="/logo-white.svg"
                download="HiveYoung-Logo-White.svg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Logo Blanco (SVG)
              </a>
              <a
                id="download-logo-main-btn"
                className="lg-btn lg-btn-outline"
                href="/Logo.svg"
                download="HiveYoung-Logo.svg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Logo Principal (SVG)
              </a>
              <a
                id="download-favicon-btn"
                className="lg-btn lg-btn-outline"
                href="/favicon.svg"
                download="HiveYoung-Favicon.svg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Favicon (SVG)
              </a>
            </div>
          </div>
        </section>

        {/* ── 4. ESPACIO DE PROTECCIÓN ── */}
        <section className="lg-section fade-section">
          <div className="lg-inner">
            <span className="lg-overline">02 — Área de Respeto</span>
            <h2 className="lg-section-title">Espacio de protección</h2>
            <p className="lg-body-text" style={{ marginBottom: "40px" }}>
              Para asegurar su legibilidad e impacto visual, el logotipo debe mantener una zona limpia libre de texto u otros elementos gráficos.
            </p>

            <div className="lg-clearspace-box">
              <div className="lg-clearspace-demo">
                <img src="/Logo.svg" alt="HiveYoung" style={{ height: "44px" }} />
                <div className="lg-clearspace-marker" style={{ top: "12px", left: "50%", transform: "translateX(-50%)" }}>x</div>
                <div className="lg-clearspace-marker" style={{ bottom: "12px", left: "50%", transform: "translateX(-50%)" }}>x</div>
                <div className="lg-clearspace-marker" style={{ left: "16px", top: "50%", transform: "translateY(-50%)" }}>x</div>
                <div className="lg-clearspace-marker" style={{ right: "16px", top: "50%", transform: "translateY(-50%)" }}>x</div>
              </div>

              <div>
                <h3 style={{ fontFamily: "'Brinnan Regular', sans-serif", fontSize: "1.4rem", fontWeight: 500, marginBottom: "12px" }}>
                  Unidad de medida (X)
                </h3>
                <p style={{ fontFamily: "'Brinnan Regular', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7 }}>
                  El área mínima de protección equivale a la altura de la letra <strong>&ldquo;H&rdquo;</strong> del logotipo (<strong>x</strong>). Ningún texto, margen o elemento ajeno debe invadir esta zona en cualquier aplicación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TAMAÑO MÍNIMO ── */}
        <section className="lg-section fade-section">
          <div className="lg-inner">
            <span className="lg-overline">03 — Especificaciones Técnicas</span>
            <h2 className="lg-section-title">Tamaños mínimos</h2>
            <p className="lg-body-text">
              Límites dimensionales autorizados para garantizar la óptima reproducción de la marca en medios impresos y digitales.
            </p>

            <div className="lg-minsizes-grid">
              {[
                { label: "Medios Digitales", value: "140 px", desc: "Ancho mínimo sugerido en pantallas web y móviles" },
                { label: "Medios Impresos",  value: "30 mm",  desc: "Ancho mínimo para papelería y material impreso" },
                { label: "Favicon / App Icon", value: "32 × 32", desc: "Dimensión mínima para íconos de navegador y app" },
              ].map((item, idx) => (
                <div key={idx} className="lg-minsize-card">
                  <div className="lg-minsize-tag">{item.label}</div>
                  <div className="lg-minsize-val">{item.value}</div>
                  <div className="lg-minsize-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

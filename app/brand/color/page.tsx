"use client";

import React, { useCallback, useRef, useState } from "react";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./color.css";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ───────────────────────────────────────────────────── */
const PRIMARY = [
  { name: "Morado Oscuro", hex: "#3A1B4E", role: "Color base de marca, fondos y elementos principales" },
  { name: "Amarillo Gold",  hex: "#FFC100", role: "CTAs, highlights y llamadas a la acción" },
  { name: "Verde",          hex: "#2EB67D", role: "Éxito, crecimiento y confirmaciones" },
  { name: "Azul",           hex: "#529CE8", role: "Links, información y confianza" },
  { name: "Magenta",        hex: "#C22359", role: "Urgencia, promociones y energía" },
  { name: "Naranja Coral",  hex: "#EE6352", role: "Calidez, invitaciones y comunidad" },
];

const ACCENT = [
  { name: "Morado Medio",    hex: "#9063AD" },
  { name: "Lila Claro",      hex: "#ECB0E1" },
  { name: "Rosa",            hex: "#FC84AA" },
  { name: "Rosa Pálido",     hex: "#FFC4D4" },
  { name: "Verde Claro",     hex: "#5CD494" },
  { name: "Verde Menta",     hex: "#74C69D" },
  { name: "Amarillo Claro",  hex: "#FECF73" },
  { name: "Amarillo Pastel", hex: "#F9DEA0" },
  { name: "Durazno",         hex: "#F79D84" },
  { name: "Azul Claro",      hex: "#74B8F9" },
  { name: "Crudo Beige",     hex: "#F4EDE4" },
];

const GRAYS = [
  { name: "Casi Negro",    hex: "#191717" },
  { name: "Gris Suave",    hex: "#7D7B7B" },
  { name: "Gris Claro",    hex: "#C4C2C2" },
  { name: "Hueso",         hex: "#F4EDE4" },
  { name: "Blanco Puro",   hex: "#FFFFFF" },
];

/* ── COMPONENT ──────────────────────────────────────────────── */
export default function ColorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toast, setToast]         = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastTimer                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(() => {
    /* Sections fade up */
    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 83%", once: true },
        }
      );
    });

    /* Stagger for palette rows */
    gsap.utils.toArray<HTMLElement>(".swatch-row").forEach((row) => {
      const items = row.querySelectorAll<HTMLElement>(".sw-item");
      gsap.fromTo(items,
        { opacity: 0, scaleY: 0.6, transformOrigin: "bottom" },
        {
          opacity: 1, scaleY: 1,
          duration: 0.55, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        }
      );
    });

    /* Hero title */
    gsap.fromTo(".cp-hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", delay: 0.1 }
    );
  }, { scope: containerRef });

  const copy = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast(hex);
      setShowToast(true);
      toastTimer.current = setTimeout(() => setShowToast(false), 2200);
    });
  }, []);

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />

      {/* Toast */}
      <div className={`cp-toast${showToast ? " show" : ""}`} aria-live="polite">
        Copiado&nbsp;<strong>{toast}</strong>
      </div>

      <div className="brand-main cp-main">

        {/* ── 1. HERO ── */}
        <section className="cp-hero">
          <h1 className="cp-hero-title">Color</h1>
        </section>

        {/* ── 2. PHILOSOPHY ── */}
        <section className="cp-philosophy fade-section">
          <div className="cp-philosophy-inner">
            <span className="cp-philo-overline">Sistema de Color · HiveYoung</span>
            <h2 className="cp-philo-title">Cada color tiene<br />un propósito.</h2>
            <p className="cp-philo-body">
              El <strong>Morado Oscuro</strong> ancla la identidad — es autoridad y profundidad.
              El <strong>Amarillo Gold</strong> activa — es el destello que invita a la acción.
              Juntos forman un sistema visual que conecta todas las expresiones de HiveYoung.
            </p>
          </div>
        </section>

        {/* ── 3. COLORES PRINCIPALES ── */}
        <section className="cp-palette-section fade-section">
          <div className="cp-palette-inner">
            <span className="cp-section-overline">01 — Colores Principales</span>
            <h2 className="cp-section-title">La base de todo</h2>
            <p className="cp-section-sub">
              Seis colores que constituyen el núcleo de la identidad HiveYoung.
            </p>
            {/* HORIZONTAL SWATCH STRIP */}
            <div className="swatch-row primary-row">
              {PRIMARY.map((c) => (
                <div
                  key={c.hex}
                  className="sw-item"
                  style={{ backgroundColor: c.hex }}
                  onClick={() => copy(c.hex)}
                  title={c.name}
                >
                  <div className="sw-label">
                    <span className="sw-name">{c.name}</span>
                    <span className="sw-hex">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. ACCENT COLORS ── */}
        <section className="cp-palette-section fade-section">
          <div className="cp-palette-inner">
            <span className="cp-section-overline">02 — Paleta Extendida</span>
            <h2 className="cp-section-title">Colores secundarios</h2>
            <p className="cp-section-sub">
              11 colores que amplían el sistema para sub-marcas, campañas y UI.
            </p>
            <div className="swatch-row accent-row">
              {ACCENT.map((c) => (
                <div
                  key={c.hex}
                  className="sw-item sw-item--sm"
                  style={{ backgroundColor: c.hex }}
                  onClick={() => copy(c.hex)}
                  title={c.name}
                >
                  <div className="sw-label">
                    <span className="sw-name">{c.name}</span>
                    <span className="sw-hex">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. ESCALA DE GRISES ── */}
        <section className="cp-palette-section fade-section">
          <div className="cp-palette-inner">
            <span className="cp-section-overline">03 — Escala de Grises</span>
            <h2 className="cp-section-title">Neutros que estructuran</h2>
            <p className="cp-section-sub">Crean jerarquía, separan contenido y generan espacios de respiro.</p>
            <div className="gray-strip swatch-row">
              {GRAYS.map((c) => (
                <div
                  key={c.hex}
                  className="sw-item"
                  style={{
                    backgroundColor: c.hex,
                    outline: c.hex === "#FFFFFF" ? "1px solid #e5e5e5" : "none",
                  }}
                  onClick={() => copy(c.hex)}
                  title={c.name}
                >
                  <div className="sw-label">
                    <span className="sw-name">{c.name}</span>
                    <span className="sw-hex">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { BrandSidebar } from "../components/BrandSidebar";
import "../brand.css";

const DOS = [
  "Usar el logo blanco sobre fondos oscuros o de color de alto contraste.",
  "Mantener el espacio de protección (x) a los cuatro lados del logo.",
  "Priorizar el amarillo #FFC100 para elementos destacados de acción y liderazgo.",
];

const DONTS = [
  "No deformar, estirar ni inclinar las proporciones oficiales del logo.",
  "No usar el logo amarillo sobre fondos claros de bajo contraste.",
  "No alterar el orden de los gradientes institucionales establecidos.",
];

export default function UsoPage() {
  return (
    <div className="brand-layout">
      <BrandSidebar />

      <div className="brand-main">
        <div className="brand-topbar">
          <Link href="/brand" className="topbar-crumb">HiveYoung</Link>
          <span className="topbar-sep">/</span>
          <span className="topbar-crumb current">Uso Correcto</span>
        </div>

        <div className="page-body" id="main-content">
          <h1 className="page-title">
            <span className="page-title-emoji">🔒</span>
            Uso Correcto
          </h1>
          <p className="page-subtitle">
            Reglas de aplicación y buenas prácticas para mantener la coherencia y la integridad visual de nuestra identidad de marca.
          </p>

          <div className="block-toc">
            <div className="toc-title">En esta página</div>
            <a href="#dos-donts" className="toc-link">Do's & Don'ts</a>
            <a href="#proporciones" className="toc-link">Reglas de Proporción</a>
          </div>

          <section id="dos-donts" className="block-section">
            <h2 className="block-h2">Do's & Don'ts</h2>
            <div className="rule-grid">
              {/* DO */}
              <div className="rule-card do">
                <div className="rule-card-header">
                  <span className="rule-icon-do">✓</span>
                  Aplicación Correcta
                </div>
                <div className="rule-preview" style={{ background: "#3A1B4E" }}>
                  <img src="/logo-white.svg" alt="Correct use" style={{ height: "32px" }} />
                </div>
                <ul className="rule-list">
                  {DOS.map((item, idx) => (
                    <li key={idx}>
                      <span className="rule-icon-do">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DONT */}
              <div className="rule-card dont">
                <div className="rule-card-header">
                  <span className="rule-icon-dont">✕</span>
                  Errores Comunes
                </div>
                <div className="rule-preview" style={{ background: "#FBF5EE" }}>
                  <img 
                    src="/logo-white.svg" 
                    alt="Incorrect use" 
                    style={{ height: "32px", transform: "skewX(20deg) scaleY(1.4)", opacity: 0.6, filter: "invert(1)" }} 
                  />
                </div>
                <ul className="rule-list">
                  {DONTS.map((item, idx) => (
                    <li key={idx}>
                      <span className="rule-icon-dont">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* NAV FOOTER */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <Link href="/brand" className="next-page-link">
              Volver al Inicio →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

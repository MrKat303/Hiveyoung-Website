"use client";

import React, { useRef } from "react";
import { BrandSidebar } from "../components/BrandSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../brand.css";
import "./tipografia.css";

gsap.registerPlugin(ScrollTrigger);

/* ── COMPONENT ────────────────────────────────────────── */
export default function TipografiaPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* Hero title entrance */
    gsap.fromTo(".tp-hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", delay: 0.15 }
    );

    /* Quote entrance */
    gsap.fromTo(".tp-quote-mark",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".tp-quote-block", start: "top 80%", once: true } }
    );
    gsap.fromTo(".tp-quote-text",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: ".tp-quote-block", start: "top 80%", once: true } }
    );
    gsap.fromTo(".tp-quote-attr",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.35,
        scrollTrigger: { trigger: ".tp-quote-block", start: "top 80%", once: true } }
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

    /* Role badge pop */
    gsap.utils.toArray<HTMLElement>(".tp-role-badge").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.85, y: 10 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          delay: i * 0.07,
        }
      );
    });

    /* Specimen big text */
    gsap.utils.toArray<HTMLElement>(".tp-font-specimen").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    /* Weight rows */
    const fontRows = document.querySelectorAll<HTMLElement>(".font-row");
    if (fontRows.length) {
      gsap.fromTo(fontRows,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".font-rows", start: "top 85%", once: true },
        }
      );
    }

    /* Scale rows */
    const scaleRows = document.querySelectorAll<HTMLElement>(".scale-row");
    if (scaleRows.length) {
      gsap.fromTo(scaleRows,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: ".scale-table", start: "top 85%", once: true },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div className="brand-layout" ref={containerRef}>
      <BrandSidebar />
      <div className="brand-main tp-main">

        {/* ── 1. HERO — VERDE ── */}
        <section className="tp-hero">
          <h1 className="tp-hero-title">Tipografía</h1>
        </section>

        {/* ── 2. QUOTE — Ellen Lupton ── */}
        <section className="tp-section tp-section--quote">
          <div className="tp-inner">
            <div className="tp-quote-block">
              <span className="tp-quote-mark">"</span>
              <blockquote className="tp-quote-text">
                Typography is what<br />language looks like.
              </blockquote>
              <cite className="tp-quote-attr">— Ellen Lupton</cite>
            </div>
          </div>
        </section>

        {/* ── 3. INTRO ── */}
        <section className="tp-section fade-section">
          <div className="tp-inner">
            <div className="tp-section-inner">
              <div className="tp-section-header">
                <div>
                  <div className="tp-section-num">Sistema tipográfico · HiveYoung</div>
                  <h2 className="tp-section-heading">Tres fuentes. Un sistema.</h2>
                </div>
              </div>
              <p className="tp-body-text">
                Cada tipografía tiene un rol claro: <strong>Giabe</strong> para el impacto visual
                de marca, <strong>Agrandir</strong> para la legibilidad y la UI,
                y <strong>Karumbi</strong> como voz complementaria de calidez y personalidad.
              </p>

              {/* Role legend */}
              <div className="tp-role-legend">
                <div className="tp-role-badge tp-role-badge--primary">
                  <span className="tp-role-dot" />
                  <span>Primary</span>
                </div>
                <div className="tp-role-badge tp-role-badge--secondary">
                  <span className="tp-role-dot" />
                  <span>Secondary</span>
                </div>
                <div className="tp-role-badge tp-role-badge--accent">
                  <span className="tp-role-dot" />
                  <span>Accent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. GIABE — PRIMARY TYPEFACE ── */}
        <section className="tp-section tp-section--purple fade-section">
          <div className="tp-inner">
            <div className="tp-section-inner">
              <div className="tp-section-header tp-section-header--light">
                <div>
                  <div className="tp-section-num tp-section-num--light">
                    <span className="tp-role-pill tp-role-pill--primary">Primary Typeface</span>
                  </div>
                  <h2 className="tp-section-heading tp-section-heading--light">Giabe</h2>
                </div>
                <span className="tp-section-sub tp-section-sub--light">Display · Identidad · Titulares</span>
              </div>

              <p className="tp-typeface-desc">
                Utilizada para titulares, mensajes principales y elementos de alto impacto visual.
                Representa la personalidad central de la marca.
              </p>

              <div className="tp-font-body">
                <div
                  className="tp-font-specimen tp-font-specimen--light"
                  style={{ fontFamily: "'Giabe Regular', serif" }}
                >
                  HiveYoung
                </div>
                <div className="tp-font-details">
                  <div className="tp-detail-name tp-detail-name--light" style={{ fontFamily: "'Giabe Regular', serif" }}>
                    Giabe Regular
                  </div>
                  <div className="tp-detail-role tp-detail-role--light">
                    Para titulares de alto impacto, portadas y el logotipo de HiveYoung.
                  </div>
                  <div className="tp-font-tags">
                    <span className="tp-tag tp-tag--light">font-family: 'Giabe Regular'</span>
                    <span className="tp-tag tp-tag--light">font-weight: 400</span>
                    <span className="tp-tag tp-tag--light">Uso: Display / Brand</span>
                  </div>
                </div>

                <div className="tp-alphabet-strip tp-alphabet-strip--light" style={{ fontFamily: "'Giabe Regular', serif" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. AGRANDIR — SECONDARY TYPEFACE ── */}
        <section className="tp-section fade-section">
          <div className="tp-inner">
            <div className="tp-section-inner">
              <div className="tp-section-header">
                <div>
                  <div className="tp-section-num">
                    <span className="tp-role-pill tp-role-pill--secondary">Secondary Typeface</span>
                  </div>
                  <h2 className="tp-section-heading">Agrandir</h2>
                </div>
                <span className="tp-section-sub">Body · UI · Subtítulos</span>
              </div>

              <p className="tp-typeface-desc tp-typeface-desc--light-bg">
                Diseñada para textos extensos y contenido informativo. Su prioridad es la
                legibilidad y el equilibrio visual.
              </p>

              <div className="tp-font-body">
                <div className="font-rows">
                  {[
                    { w: "300", sample: "Liderazgo juvenil en Latinoamérica" },
                    { w: "400", sample: "Principal articulador del ecosistema" },
                    { w: "500", sample: "Conectamos, potenciamos, visibilizamos" },
                  ].map(({ w, sample }) => (
                    <div
                      key={w}
                      className="font-row"
                      style={{ fontFamily: "'Brinnan Regular', sans-serif", fontWeight: w }}
                    >
                      <div className="font-row-sample">{sample}</div>
                      <div className="font-row-meta">weight {w}</div>
                    </div>
                  ))}
                </div>
                <div className="tp-font-details">
                  <div className="tp-detail-name" style={{ fontFamily: "'Brinnan Regular', sans-serif" }}>
                    Agrandir
                  </div>
                  <div className="tp-detail-role">
                    Para párrafos, UI, subtítulos y cualquier texto de cuerpo largo.
                  </div>
                  <div className="tp-font-tags">
                    <span className="tp-tag">font-family: 'Brinnan Regular'</span>
                    <span className="tp-tag">weights: 300 · 400 · 500</span>
                    <span className="tp-tag">Uso: Body / UI</span>
                  </div>
                </div>

                <div className="tp-alphabet-strip" style={{ fontFamily: "'Brinnan Regular', sans-serif" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. KARUMBI — ACCENT TYPEFACE ── */}
        <section className="tp-section tp-section--accent fade-section">
          <div className="tp-inner">
            <div className="tp-section-inner">
              <div className="tp-section-header">
                <div>
                  <div className="tp-section-num">
                    <span className="tp-role-pill tp-role-pill--accent">Accent Typeface</span>
                    <span className="tp-optional-badge">opcional</span>
                  </div>
                  <h2 className="tp-section-heading">Karumbi</h2>
                </div>
                <span className="tp-section-sub">Acentos · Citas · Editorial</span>
              </div>

              <p className="tp-typeface-desc tp-typeface-desc--light-bg">
                Utilizada de manera limitada para destacar información específica o aportar
                carácter en aplicaciones puntuales.
              </p>

              <div className="tp-font-body">
                <div
                  className="tp-font-specimen tp-font-specimen--karumbi"
                  style={{ fontFamily: "'Karumbi', cursive" }}
                >
                  Liderazgo<br />Joven
                </div>
                <div className="tp-font-details">
                  <div className="tp-detail-name" style={{ fontFamily: "'Karumbi', cursive" }}>
                    Karumbi
                  </div>
                  <div className="tp-detail-role">
                    Para piezas editoriales, citas inspiracionales y momentos de calidez humana.
                  </div>
                  <div className="tp-font-tags">
                    <span className="tp-tag">font-family: 'Karumbi'</span>
                    <span className="tp-tag">Uso: Contextual / Acento</span>
                  </div>
                </div>

                <div className="tp-alphabet-strip" style={{ fontFamily: "'Karumbi', cursive" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. TYPE SCALE ── */}
        <section className="tp-section fade-section">
          <div className="tp-inner">
            <div className="tp-section-inner">
              <div className="tp-section-header">
                <div>
                  <div className="tp-section-num">04 — Escala Tipográfica</div>
                  <h2 className="tp-section-heading">Jerarquía visual</h2>
                </div>
              </div>
              <div className="scale-table">
                {[
                  { role: "Display",   size: "112px", weight: "900", font: "Giabe Regular",   sample: "HiveYoung"              },
                  { role: "Heading 1", size: "64px",  weight: "900", font: "Giabe Regular",   sample: "Liderazgo"              },
                  { role: "Heading 2", size: "40px",  weight: "500", font: "Brinnan Regular", sample: "Ecosistema Joven"       },
                  { role: "Heading 3", size: "24px",  weight: "500", font: "Brinnan Regular", sample: "Conecta con líderes"    },
                  { role: "Body",      size: "17px",  weight: "400", font: "Brinnan Regular", sample: "HiveYoung conecta líderes juveniles." },
                  { role: "Caption",   size: "12px",  weight: "400", font: "Brinnan Regular", sample: "Nota al pie · Metadata" },
                ].map((row) => (
                  <div className="scale-row" key={row.role}>
                    <div className="scale-meta">
                      <span className="scale-role">{row.role}</span>
                      <span className="scale-info">{row.size} · {row.font}</span>
                    </div>
                    <div
                      className="scale-sample"
                      style={{
                        fontFamily: row.font === "Giabe Regular"
                          ? "'Giabe Regular', serif"
                          : "'Brinnan Regular', sans-serif",
                        fontWeight: row.weight,
                        fontSize: row.size,
                      }}
                    >
                      {row.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

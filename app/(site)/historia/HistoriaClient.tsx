"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Historia.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const optimizeCld = (url: string) => {
    if (!url.includes('upload/')) return url;
    return url.replace('upload/', 'upload/f_auto,q_auto/');
}

const historyItems = [
    {
        id: 'founders',
        year: "2024",
        title: "La Fundación",
        subtitle: "El Origen",
        desc: "Tres estudiantes con una visión compartida dan inicio a HiveYoung. El comienzo de todo.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
        theme: "dark",
        fit: "contain"
    },
    {
        id: 'eventos',
        year: "2024",
        title: "Primeros Pasos",
        subtitle: "Comunidad y Eventos",
        desc: "Comenzamos a asistir a eventos, conectar con el ecosistema y validar nuestra propuesta.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016942/20240924_115026_osmgus.heic",
        theme: "light"
    },
    {
        id: 'reuniones',
        year: "2024",
        title: "La Decisión",
        subtitle: "Hacia el Congreso",
        desc: "Decidimos ir por más. Nace la idea de organizar nuestro propio Congreso. Planificación intensa.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016930/20250509_130743_oax4i7.heic",
        theme: "dark"
    },
    {
        id: 'congreso',
        year: "2025",
        title: "Ejecución",
        subtitle: "El Primer Congreso",
        desc: "Un año de trabajo arduo gestionando y haciendo realidad el hito más grande de nuestra historia.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
        theme: "green"
    },
    {
        id: 'disfrutar',
        year: "2025",
        title: "Consolidación",
        subtitle: "Resultados",
        desc: "Celebramos el impacto logrado y la fuerza de una comunidad que no para de crecer.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016921/IMG-20250519-WA0111_yk5dze.jpg",
        theme: "light"
    },
    {
        id: 'creciendo',
        year: "2026",
        title: "El Ahora",
        subtitle: "Expansión",
        desc: "Hoy, HiveYoung es una realidad que sigue escalando. Nuevos horizontes y más liderazgo.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016902/IMG-20250930-WA0098_yw5tmg.jpg",
        theme: "dark"
    },
    { id: 'p1', year: "2026+", title: "Futuro", subtitle: "Próximamente", desc: "La historia se sigue escribiendo...", img: "", theme: "light", type: "placeholder" },
];

export default function HistoriaClient() {
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // Initial Set: Keep opacity at 1 to prevent issues, animation controls it
            gsap.set('.hero-title-text', { opacity: 0, y: 50 });

            // 1. Reveal Title (Entrance)
            gsap.to('.hero-title-text', {
                opacity: 1, y: 0, duration: 1.2, delay: 0.1, ease: 'power3.out'
            });

            // 2. Zoom Effect - Explicit fromTO for guaranteed reversibility
            if (heroRef.current) {
                const zoomTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=800',
                        scrub: 0.5, // Smooth scrub
                        pin: true,
                    }
                });

                // Using fromTo forces GSAP to know exactly where to go back to (scale 1, opacity 1)
                // This fixes the "Doesn't appear when scrolling back" issue
                zoomTl.fromTo('.hero-title-text',
                    { scale: 1, opacity: 1 },
                    { scale: 20, opacity: 0, ease: 'power2.in', immediateRender: false }
                );
            }

            // 3. BG & Quote
            if (quoteRef.current) {
                gsap.to('.historia-bg-wrapper', {
                    backgroundColor: '#3a1b4e',
                    scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', end: 'center center', scrub: true }
                });
                gsap.fromTo('.quote-paragraph',
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: {
                            trigger: quoteRef.current, start: 'top 65%', toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            // 4. Horizontal Scroll
            const track = trackRef.current;
            const container = scrollContainerRef.current;

            if (track && container) {
                const itemsCount = historyItems.length;

                const tlHorizontal = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        pin: true,
                        start: "top top",
                        end: "+=3500",
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                tlHorizontal.to(track, {
                    x: `-${(itemsCount - 1) * 100}vw`,
                    ease: "none"
                });

                tlHorizontal.fromTo('.story-line-progress',
                    { scaleX: 0 },
                    { scaleX: 1, ease: "none" },
                    0
                );

                // Force initial layout
                tlHorizontal.progress(0);
            }

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const quote = "Cuando los jóvenes se organizan, las ideas dejan de ser sueños y se convierten en acción";

    return (
        <div ref={mainRef} className="historia-container">
            <div className="historia-bg-wrapper"></div>

            <section ref={heroRef} className="story-panel section-hero">
                <div className="hero-content-center">
                    <h1 className="hero-title-text" style={{ opacity: 1 }}>NUESTRA<br />HISTORIA</h1>
                </div>
            </section>

            <section ref={quoteRef} className="story-panel section-quote">
                <div className="quote-wrapper">
                    <p className="quote-paragraph">
                        Cuando los jóvenes se organizan,<br />
                        las ideas dejan de ser sueños<br />
                        y se convierten en <span className="text-highlight">acción</span>.
                    </p>
                </div>
            </section>

            <section ref={scrollContainerRef} className="horizontal-scroll-container" style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}>
                <div ref={trackRef} className="horizontal-track" style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    width: `${historyItems.length * 100}vw`,
                    willChange: 'transform'
                }}>

                    <div className="story-line"></div>
                    <div className="story-line-progress"></div>

                    {historyItems.map((item, index) => (
                        <div key={item.id} className={`horizontal-panel panel-theme-${item.theme}`}>
                            <div className="timeline-dot"></div>
                            <div className={`fullscreen-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                                <div className="panel-text-col">
                                    <div className="year-label">{item.year}</div>
                                    <h3>{item.title}</h3>
                                    <h4>{item.subtitle}</h4>
                                    <p>{item.desc}</p>
                                </div>
                                <div className="panel-image-col">
                                    {/* @ts-ignore */}
                                    {item.type === 'placeholder' ? (
                                        <div className="placeholder-full"><span>Próximamente</span></div>
                                    ) : (
                                        <>
                                            {/* @ts-ignore */}
                                            {(item.fit === 'contain') ? (
                                                <div className="contain-img-wrapper">
                                                    <img src={optimizeCld(item.img)} alt={item.title} className="story-img-contain" />
                                                </div>
                                            ) : (
                                                <div className="cover-img-base">
                                                    <Image src={optimizeCld(item.img)} alt={item.title} fill className="story-img-cover" />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

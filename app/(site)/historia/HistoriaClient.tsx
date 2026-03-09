"use client";

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger, DrawSVGPlugin, Observer, ScrollToPlugin } from 'gsap/all';
import './Historia.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const optimizeCld = (url: string) => {
    if (!url.includes('upload/')) return url;
    return url.replace('upload/', 'upload/f_auto,q_auto/');
}

interface HistoryItem {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    desc: string;
    img: string;
    theme: string;
    fit?: string;
    type?: string;
    imgPosition?: string;
}

const historyItems: HistoryItem[] = [
    {
        id: 'founders',
        year: "2024",
        title: "La Fundación",
        subtitle: "El Origen",
        desc: "Tres estudiantes con una visión compartida dan inicio a HiveYoung. El comienzo de todo.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
        theme: "dark",
        fit: "cover",
        imgPosition: "78% center"
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
    }
];

export default function HistoriaClient() {
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, Observer, ScrollToPlugin);
        ScrollTrigger.config({ ignoreMobileResize: true });
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            gsap.set('.drawn-text', { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 });
            const tl = gsap.timeline({ delay: 0.2 });
            tl.to('.drawn-text', {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 2.5,
                ease: 'power2.out',
                stagger: 0.1
            }).to('.drawn-text', {
                fill: "#3a1b4e",
                duration: 1.2,
                ease: "power1.inOut"
            }, "-=1.5");
        }, mainRef);

        mm.add("all", () => {
            const panels = gsap.utils.toArray('.horizontal-panel') as HTMLElement[];
            const isMobile = window.innerWidth <= 900;
            
            // Set initial state
            gsap.set(panels, { yPercent: 100, zIndex: (i) => i + 10 });
            gsap.set('.title-wrapper', { transformOrigin: "center center" });

            const tl = gsap.timeline();
            const snapPoints: number[] = [0]; // 0 is Hero state

            let time = 0;

            panels.forEach((panel, i) => {
                const theme = historyItems[i].theme;
                const bgColor = theme === 'dark' ? '#3a1b4e' : theme === 'green' ? '#2eb67d' : '#f4ede4';

                const textContent = panel.querySelectorAll('.panel-text-col > *');
                const img = panel.querySelector('.panel-image-col img');

                // Animar el panel entrando desde abajo (transición rápida al hacer scroll)
                tl.to(panel, { yPercent: 0, duration: 1, ease: "none" }, time);
                
                // Animar el color de fondo
                tl.to('.historia-bg-wrapper', { backgroundColor: bgColor, duration: 1, ease: "none" }, time);

                // Si es el primero, borrar el título del hero
                if (i === 0) {
                    tl.to('.title-wrapper', { scale: isMobile ? 3 : 5, opacity: 0, duration: 1, ease: "none" }, time);
                }

                // Aparición de textos e imagen
                if (textContent.length) {
                    gsap.set(textContent, { opacity: 0, y: 30 });
                    tl.to(textContent, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "none" }, time + 0.5);
                }

                if (img) {
                    gsap.set(img, { opacity: 0, filter: "blur(20px)" });
                    tl.to(img, { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, time + 0.6);
                }

                time += 1.0; // Fin de la animación de transición
                
                // Zona de lectura (1 unidad de tiempo)
                tl.to({}, { duration: 1 }, time);
                time += 0.5; // El punto central de lectura para el snap
                snapPoints.push(time);
                time += 0.5;
            });

            // Normalizamos los puntos de snap de 0 a 1
            const totalDuration = tl.duration();
            const snapProgress = snapPoints.map(t => t / totalDuration);

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                pin: true,
                start: "top top",
                end: `+=${panels.length * 1500}`, // Espacio suficiente para leer
                animation: tl,
                scrub: true, // Scrub directo sin retraso evita bugs
                snap: {
                    snapTo: snapProgress,
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.05, // Snap casi inmediato al soltar
                    ease: "power1.inOut"
                }
            });
        });

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={mainRef} className="historia-container">
            <div className="historia-bg-wrapper"></div>
            
            <section ref={scrollContainerRef} className="horizontal-scroll-container">
                <section ref={heroRef} className="story-panel section-hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                    <div className="hero-content-center">
                        <div className="title-wrapper">
                            <svg className="hero-title-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                                <text x="400" y="200" textAnchor="middle" className="drawn-text" fill="transparent" stroke="#3a1b4e" strokeWidth="1.5" fontSize="130" fontWeight="900" fontFamily="Poppins, sans-serif">NUESTRA</text>
                                <text x="400" y="380" textAnchor="middle" className="drawn-text" fill="transparent" stroke="#3a1b4e" strokeWidth="1.5" fontSize="130" fontWeight="900" fontFamily="Poppins, sans-serif">HISTORIA</text>
                            </svg>
                        </div>
                    </div>
                </section>

                <div ref={trackRef} className="horizontal-track" style={{ zIndex: 2, position: 'relative' }}>
                    {historyItems.map((item, index) => (
                        <div key={item.id} className={`horizontal-panel panel-theme-${item.theme} ${index === 0 ? 'panel-first' : ''}`}>
                            <div className="timeline-dot"></div>
                            <div className="mobile-timeline-dot"></div>
                            <div className={`fullscreen-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                                <div className="panel-text-col">
                                    {index < historyItems.length - 1 && (
                                        <div className="year-label">{item.year}</div>
                                    )}
                                    <h3>{item.title}</h3>
                                    <h4>{item.subtitle}</h4>
                                    <p>{item.desc}</p>
                                </div>
                                <div className={`panel-image-col ${index === 0 ? 'force-contain-mobile' : ''}`}>
                                    {item.type === 'placeholder' ? (
                                        <div className="placeholder-full"><span>Próximamente</span></div>
                                    ) : (
                                        <div className={item.fit === 'contain' ? "contain-img-wrapper" : "cover-img-base"}>
                                            <Image
                                                src={optimizeCld(item.img)}
                                                alt={item.title}
                                                fill
                                                className={item.fit === 'contain' ? "story-img-contain-new" : "story-img-cover"}
                                                style={{
                                                    objectFit: item.fit === 'contain' ? 'contain' : 'cover',
                                                    objectPosition: item.imgPosition || 'center'
                                                }}
                                                unoptimized={item.img.endsWith('.heic')}
                                                priority={index <= 1}
                                            />
                                        </div>
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

"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import './Historia.css';

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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
        const mm = gsap.matchMedia();

        // Common animations (Reveal Title) - Using context for scoping
        gsap.context(() => {
            gsap.set('.drawn-text', { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 });

            const tl = gsap.timeline({ delay: 0.2 });

            tl.to('.drawn-text', {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 2.5,
                ease: 'power2.out',
                stagger: 0.1
            })
                .to('.drawn-text', {
                    fill: "#3a1b4e",
                    duration: 1.2,
                    ease: "power1.inOut"
                }, "-=1.5");
        }, mainRef);

        // DESKTOP LOGIC
        mm.add("(min-width: 901px)", () => {
            // 1. Hero Zoom & Pin
            if (heroRef.current) {
                const zoomTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=800',
                        scrub: 0.5,
                        pin: true,
                        anticipatePin: 1,
                    }
                });
                zoomTl.fromTo('.title-wrapper',
                    { scale: 1, opacity: 1 },
                    {
                        scale: 18,
                        opacity: 0,
                        ease: 'power2.in',
                        immediateRender: false,
                        force3D: true
                    }
                );
            }

            // 2. BG Transition
            if (scrollContainerRef.current) {
                gsap.to('.historia-bg-wrapper', {
                    backgroundColor: '#3a1b4e',
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top 90%",
                        end: "top 20%",
                        scrub: true
                    }
                });
            }

            // 3. Horizontal Scroll
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
            }
        });

        // MOBILE LOGIC
        mm.add("(max-width: 900px)", () => {
            // 1. Hero Zoom Effect (like desktop but adapted for mobile)
            if (heroRef.current) {
                const heroTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=600',
                        scrub: 0.5,
                        pin: true,
                        anticipatePin: 1,
                    }
                });
                heroTl.fromTo('.title-wrapper',
                    { scale: 1, opacity: 1 },
                    {
                        scale: 6,
                        opacity: 0,
                        ease: 'power2.in',
                        immediateRender: false,
                        force3D: true
                    }
                );
            }

            // 2. BG Transition
            if (scrollContainerRef.current) {
                gsap.to('.historia-bg-wrapper', {
                    backgroundColor: '#3a1b4e',
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true
                    }
                });
            }

            // 3. Vertical Timeline Progress Bar
            if (scrollContainerRef.current) {
                gsap.to('.mobile-timeline-progress', {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true
                    }
                });
            }

            // 4. Enhanced Panel Animations
            const panels = gsap.utils.toArray('.horizontal-panel') as HTMLElement[];
            panels.forEach((panel) => {
                const dot = panel.querySelector('.mobile-timeline-dot');
                const yearLabel = panel.querySelector('.year-label');
                const textCol = panel.querySelector('.panel-text-col');
                const imageCol = panel.querySelector('.panel-image-col');

                // Timeline dot animation
                if (dot) {
                    gsap.fromTo(dot,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1, opacity: 1, duration: 0.5,
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 70%",
                            }
                        }
                    );
                }

                // Year label reveal
                if (yearLabel) {
                    gsap.fromTo(yearLabel,
                        { opacity: 0, x: -30 },
                        {
                            opacity: 0.4, x: 0, duration: 0.8,
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 75%",
                            }
                        }
                    );
                }

                // Image slide up with blur
                if (imageCol) {
                    gsap.fromTo(imageCol,
                        { opacity: 0, y: 80, filter: 'blur(10px)' },
                        {
                            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 70%",
                            }
                        }
                    );
                }

                // Text content staggered reveal
                if (textCol) {
                    const textElements = textCol.querySelectorAll('h3, h4, p');
                    gsap.fromTo(textElements,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1, y: 0, duration: 0.8,
                            stagger: 0.1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 60%",
                            }
                        }
                    );
                }
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <div ref={mainRef} className="historia-container">
            <div className="historia-bg-wrapper"></div>

            <section ref={heroRef} className="story-panel section-hero">
                <div className="hero-content-center">
                    <div className="title-wrapper">
                        <svg className="hero-title-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                            <text
                                x="50%"
                                y="42%"
                                textAnchor="middle"
                                className="drawn-text"
                                fill="transparent"
                                stroke="#3a1b4e"
                                strokeWidth="1.5"
                                style={{ fontSize: '120px', fontWeight: 900, fontFamily: 'Poppins, sans-serif' }}
                            >NUESTRA</text>
                            <text
                                x="50%"
                                y="88%"
                                textAnchor="middle"
                                className="drawn-text"
                                fill="transparent"
                                stroke="#3a1b4e"
                                strokeWidth="1.5"
                                style={{ fontSize: '120px', fontWeight: 900, fontFamily: 'Poppins, sans-serif' }}
                            >HISTORIA</text>
                        </svg>
                    </div>
                </div>
            </section>

            <section ref={scrollContainerRef} className="horizontal-scroll-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <div ref={trackRef} className="horizontal-track" style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    width: `${historyItems.length * 100}vw`,
                    willChange: 'transform'
                }}>

                    <div className="story-line"></div>
                    <div className="story-line-progress"></div>

                    {/* Mobile Timeline */}
                    <div className="mobile-timeline">
                        <div className="mobile-timeline-line"></div>
                        <div className="mobile-timeline-progress"></div>
                    </div>

                    {historyItems.map((item, index) => (
                        <div key={item.id} className={`horizontal-panel panel-theme-${item.theme}`}>
                            <div className="timeline-dot"></div>
                            <div className="mobile-timeline-dot"></div>
                            <div className={`fullscreen-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                                <div className="panel-text-col">
                                    <div className="year-label">{item.year}</div>
                                    <h3>{item.title}</h3>
                                    <h4>{item.subtitle}</h4>
                                    <p>{item.desc}</p>
                                </div>
                                <div className="panel-image-col">
                                    {item.type === 'placeholder' ? (
                                        <div className="placeholder-full"><span>Próximamente</span></div>
                                    ) : (
                                        <div className={item.fit === 'contain' ? "contain-img-wrapper" : "cover-img-base"}>
                                            <Image
                                                src={optimizeCld(item.img)}
                                                alt={item.title}
                                                fill
                                                className={item.fit === 'contain' ? "story-img-contain-new" : "story-img-cover"}
                                                style={item.fit === 'contain' ? { objectFit: 'contain' } : { objectFit: 'cover' }}
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

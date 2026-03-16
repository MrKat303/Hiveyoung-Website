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
    alt: string;
    theme: string;
    fit?: string;
    type?: string;
    imgPosition?: string;
}

const historyItems: HistoryItem[] = [
    {
        id: 'founders',
        year: "2024",
        title: "Donde todo comenzó",
        subtitle: "El inicio",
        desc: "Todo comenzó con tres estudiantes del Instituto Nacional: Cristian Suárez, Lucas Galleguillos y Vicente Olguín. Provenían de intereses distintos, pero compartían una misma idea: crear una plataforma que conectara a jóvenes con distintos talentos, pasiones y ganas de hacer cosas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
        alt: "Cristian Suárez, Lucas Galleguillos y Vicente Olguín, cofundadores de HiveYoung.",
        theme: "dark",
        fit: "cover",
        imgPosition: "77% 25%"
    },
    {
        id: 'eventos',
        year: "2024",
        title: "Los primeros pasos",
        subtitle: "Expandiendo el horizonte",
        desc: "La idea comenzó a crecer. Compañeros se fueron sumando al proyecto y el equipo empezó a moverse: asistir a eventos, aprender, hacer networking y conocer personas. Poco a poco, HiveYoung empezaba a abrirse camino.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png",
        alt: "El equipo de HiveYoung en sus primeros pasos",
        theme: "light"
    },
    {
        id: 'reuniones',
        year: "2024",
        title: "Construyendo algo real",
        subtitle: "De la idea a la acción",
        desc: "Se formó un equipo y comenzaron a dar forma al primer gran proyecto: el Congreso HiveYoung. Lo que había empezado como una conversación entre amigos comenzó a transformarse en algo mucho más grande: un proyecto con propósito, valores y una visión clara para la juventud.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
        alt: "El equipo de HiveYoung trabajando en la planificación del Congreso",
        theme: "dark"
    },
    {
        id: 'congreso',
        year: "2025",
        title: "El primer gran desafío",
        subtitle: "Organización y compromiso",
        desc: "En 2025 llegó nuestro primer gran reto: organizar el Congreso HiveYoung. Fueron más de seis meses de trabajo intenso: planificación, reuniones, coordinación y muchas horas dedicadas al proyecto, incluso sacrificando tiempo de clases.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
        alt: "Speakers Congreso HiveYoung junto a sus organizadores (Cristian Suarez, Lucas Galleguillos y Vicente Olguin)",
        theme: "green"
    },
    {
        id: 'disfrutar',
        year: "2025",
        title: "Un punto de inflexión",
        subtitle: "Impacto masivo",
        desc: "El Congreso HiveYoung reunió a más de 2000 estudiantes y más de 30 instituciones. Lo que comenzó como una idea entre tres estudiantes se transformó en un evento capaz de movilizar a toda una comunidad y abrió paso a nuevas ideas, colaboraciones e iniciativas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016921/IMG-20250519-WA0111_yk5dze.jpg",
        alt: "Lanzamiento oficial del Congreso HiveYoung 2025 con gran convocatoria",
        theme: "light"
    },
    {
        id: 'creciendo',
        year: "2026",
        title: "Lo que viene",
        subtitle: "El futuro es nuestro",
        desc: "Hoy HiveYoung sigue creciendo. Nuevos proyectos, nuevas personas y nuevas ideas siguen sumándose. Porque esto no es solo una organización. Es una generación de jóvenes construyendo el futuro juntos.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016902/IMG-20250930-WA0098_yw5tmg.jpg",
        alt: "El equipo de HiveYoung participando en el Summit de País Digital 2025",
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

        mm.add({
            isDesktop: "(min-width: 901px)",
            isMobile: "(max-width: 900px)"
        }, (context) => {
            const { isMobile } = context.conditions as any;
            const panels = gsap.utils.toArray('.horizontal-panel') as HTMLElement[];
            
            // Set initial state
            gsap.set(panels, { yPercent: 100, zIndex: (i) => i + 10 });
            gsap.set('.title-wrapper', { transformOrigin: "center center" });

            const tl = gsap.timeline();
            const snapPoints: number[] = [0]; 

            let time = 0;

            panels.forEach((panel, i) => {
                const theme = historyItems[i].theme;
                const bgColor = theme === 'dark' ? '#3a1b4e' : theme === 'green' ? '#2eb67d' : '#f4ede4';

                const textContent = panel.querySelectorAll('.panel-text-col > *');
                const img = panel.querySelector('.panel-image-col img');

                // Animate panel entry
                tl.to(panel, { 
                    yPercent: 0, 
                    duration: isMobile ? 0.8 : 1, 
                    ease: "none" 
                }, time);
                
                // Background color transition
                tl.to('.historia-bg-wrapper', { 
                    backgroundColor: bgColor, 
                    duration: 0.8, 
                    ease: "none" 
                }, time);

                // Exit hero title
                if (i === 0) {
                    tl.to('.title-wrapper', { 
                        scale: isMobile ? 2.5 : 5, 
                        opacity: 0, 
                        duration: 0.8, 
                        ease: "none" 
                    }, time);
                }

                // Simplified animations to avoid LAG
                if (textContent.length) {
                    gsap.set(textContent, { opacity: 0, y: isMobile ? 10 : 20 });
                    tl.to(textContent, { 
                        y: 0, 
                        opacity: 1, 
                        duration: isMobile ? 0.3 : 0.4, 
                        stagger: isMobile ? 0 : 0.05, 
                        ease: "power2.out",
                        force3D: true
                    }, time + 0.3);
                }

                if (img) {
                    // REMOVED BLUR: It's extremely expensive for the CPU/GPU during scroll
                    gsap.set(img, { opacity: 0 });
                    tl.to(img, { 
                        opacity: 1, 
                        duration: isMobile ? 0.4 : 0.6, 
                        ease: "none",
                        force3D: true
                    }, time + 0.4);
                }

                time += 1.0; 
                tl.to({}, { duration: 1 }, time);
                time += 0.5; 
                snapPoints.push(time);
                time += 0.5;
            });

            const totalDuration = tl.duration();
            const snapProgress = snapPoints.map(t => t / totalDuration);

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                pin: true,
                start: "top top",
                end: `+=${panels.length * (isMobile ? 1000 : 1500)}`, 
                animation: tl,
                scrub: isMobile ? 0.05 : 0.5, // Smoother scrub values
                snap: {
                    snapTo: snapProgress,
                    duration: { min: 0.2, max: 0.5 }, // Slightly longer duration for smoother snapping
                    delay: 0.05, 
                    ease: "power2.inOut"
                },
                fastScrollEnd: isMobile,
                preventOverlaps: true,
                anticipatePin: 1 // Helps prevent the "jump" when sticking starts
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
                                    <p>{item.desc}</p>
                                </div>
                                <div className={`panel-image-col ${index === 0 ? 'force-contain-mobile' : ''}`}>
                                    {item.type === 'placeholder' ? (
                                        <div className="placeholder-full"><span>Próximamente</span></div>
                                    ) : (
                                        <div className={item.fit === 'contain' ? "contain-img-wrapper" : "cover-img-base"}>
                                            <Image
                                                src={optimizeCld(item.img)}
                                                alt={item.alt}
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

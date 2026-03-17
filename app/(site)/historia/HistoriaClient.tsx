"use client";

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Link from "next/link";
import FloatingNames from "./FloatingNames";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger, DrawSVGPlugin, Observer, ScrollToPlugin } from 'gsap/all';
import { ChevronDown } from 'lucide-react';
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
        alt: "Fotografía de los fundadores de HiveYoung: Cristian Suárez, Lucas Galleguillos y Vicente Olguín en sus inicios.",
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
        alt: "Equipo de HiveYoung participando en actividades de networking y formación inicial.",
        theme: "light"
    },
    {
        id: 'reuniones',
        year: "2024",
        title: "Construyendo algo real",
        subtitle: "De la idea a la acción",
        desc: "Se formó un equipo y comenzaron a dar forma al primer gran proyecto: el Congreso HiveYoung. Lo que había empezado como una conversación entre amigos comenzó a transformarse en algo mucho más grande: un proyecto con propósito, valores y una visión clara para la juventud.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
        alt: "El equipo de trabajo de HiveYoung planificando la estrategia del primer Congreso.",
        theme: "dark"
    },
    {
        id: 'congreso',
        year: "2025",
        title: "El primer gran desafío",
        subtitle: "Organización y compromiso",
        desc: "En 2025 llegó nuestro primer gran reto: organizar el Congreso HiveYoung. Fueron más de seis meses de trabajo intenso: planificación, reuniones, coordinación y muchas horas dedicadas al proyecto, incluso sacrificando tiempo de clases.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
        alt: "Organizadores de HiveYoung junto a speakers destacados durante el Congreso 2025.",
        theme: "green"
    },
    {
        id: 'disfrutar',
        year: "2025",
        title: "Un punto de inflexión",
        subtitle: "Impacto masivo",
        desc: "El Congreso HiveYoung reunió a más de 2000 estudiantes y más de 30 instituciones. Lo que comenzó como una idea entre tres estudiantes se transformó en un evento capaz de movilizar a toda una comunidad y abrió paso a nuevas ideas, colaboraciones e iniciativas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681115/WhatsApp_Image_2026-03-16_at_14.06.02_b61imy.jpg",
        alt: "Grupo masivo de voluntarios de HiveYoung celebrando el éxito del Congreso con más de 2000 asistentes.",
        theme: "light"
    },
    {
        id: 'cierre',
        year: "",
        title: "Esta historia no sería posible sin quienes creyeron en ella desde el comienzo",
        subtitle: "A quienes hicieron posible este comienzo y a quienes escribirán lo que viene.",
        desc: "",
        img: "",
        alt: "",
        theme: "dark",
        type: "text-only"
    }
];

const galleryImages = [
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679224/4_mshec9.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/5_pniltf.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769026522/IMG-20250328-WA0013_yd0oal.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456719/Voluntarios_sepxvr.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/8_tgves4.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/6_rjmmix.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/7_ppzkqu.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/1_ualneu.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016933/20241015_115636_yjywyl.heic",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679372/IMG-20241017-WA0040_mmmmdm.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679377/20241015_115636_1_phuagk.heic",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681116/WhatsApp_Image_2026-03-16_at_14.06.02_1_lchn49.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681115/WhatsApp_Image_2026-03-16_at_14.06.02_b61imy.jpg"
];

const galleryAlts = [
    "Momentos HiveYoung: Liderazgo y comunidad juvenil",
    "Encuentros HiveYoung: Jóvenes agentes de cambio en Chile",
    "Colaboración juvenil HiveYoung: Construyendo el futuro",
    "Comunidad HiveYoung: Empoderamiento y talento",
    "Networking juvenil HiveYoung: Conectando ideas",
    "Iniciativas HiveYoung: Impacto social real",
    "Cultura HiveYoung: Innovación y propósito",
    "HiveYoung: La red de talento más activa de Latinoamérica"
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
                fill: "#ffffff",
                duration: 1.2,
                ease: "power1.inOut"
            }, "-=1.5");

            // Hero Gallery Continuous Animation
            const cols = gsap.utils.toArray('.gallery-column') as HTMLElement[];
            cols.forEach((col, i) => {
                // Alternate directions: even columns go up, odd go down
                const direction = i % 2 === 0 ? -1 : 1;
                // Get exactly half the height to loop perfectly (since images are duplicated)
                const distance = col.scrollHeight / 2;
                
                // Set initial position for downward moving columns to prevent empty space at start
                if (direction === 1) {
                    gsap.set(col, { y: -distance });
                }

                gsap.to(col, {
                    y: direction === -1 ? -distance : 0,
                    ease: "none",
                    duration: 120 + (i * 10), // Slightly different speeds for parallax effect
                    repeat: -1,
                    modifiers: {
                        y: gsap.utils.unitize(y => parseFloat(y) % distance)
                    },
                    onRepeat: () => {
                        if (direction === 1) {
                            gsap.set(col, { y: -distance });
                        }
                    }
                });
            });
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

            const tlScroll = gsap.timeline();
            const snapPoints: number[] = [0]; 

            let time = 0;

            panels.forEach((panel, i) => {
                const theme = historyItems[i].theme;
                const bgColor = theme === 'dark' ? '#3a1b4e' : theme === 'green' ? '#2eb67d' : '#f4ede4';

                const img = panel.querySelector('.panel-image-col img');

                // Animate panel entry
                tlScroll.to(panel, { 
                    yPercent: 0, 
                    duration: isMobile ? 0.8 : 1, 
                    ease: "none" 
                }, time);
                
                // Background color transition - faster to avoid "invisible" feel
                tlScroll.to('.historia-bg-wrapper', { 
                    backgroundColor: bgColor, 
                    duration: 0.2, 
                    ease: "none" 
                }, time);

                // Exit hero title
                if (i === 0) {
                    tlScroll.to('.title-wrapper', { 
                        scale: isMobile ? 2.5 : 5, 
                        opacity: 0, 
                        duration: 0.8, 
                        ease: "none" 
                    }, time);
                }

                // Simplified animations to avoid LAG
                // Removed entrance animations for text elements to avoid 'settling' or 'fading' effect
                const mainTextElements = panel.querySelectorAll('.panel-text-col > div, .panel-text-col h3, .panel-text-col p');
                const floatingNames = panel.querySelectorAll('.floating-name');

                if (mainTextElements.length) {
                    gsap.set(mainTextElements, { opacity: 1, y: 0, color: '#ffffff' });
                }

                if (floatingNames.length) {
                    gsap.set(floatingNames, { opacity: 1, y: 0 });
                }

                if (img) {
                    // REMOVED BLUR: It's extremely expensive for the CPU/GPU during scroll
                    gsap.set(img, { opacity: 0 });
                    tlScroll.to(img, { 
                        opacity: 1, 
                        duration: isMobile ? 0.4 : 0.6, 
                        ease: "none",
                        force3D: true
                    }, time + 0.4);
                }

                time += 1.0; 
                tlScroll.to({}, { duration: 1 }, time);
                time += 0.5; 
                snapPoints.push(time);
                time += 0.5;
            });

            const totalDuration = tlScroll.duration();
            // const snapProgress = snapPoints.map(t => t / totalDuration);

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                pin: true,
                start: "top top",
                end: `+=${panels.length * (isMobile ? 1000 : 1500)}`, 
                animation: tlScroll,
                scrub: 1,
                // snap: snapProgress // Snap can feel a bit mechanical but good for precise viewing
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
                <section ref={heroRef} className="story-panel section-hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, overflow: 'hidden' }}>
                    {/* Animated GSAP Gallery background */}
                    <div className="hero-gallery-wrap" aria-hidden="true" style={{ backgroundColor: '#3a1b4e' }}>
                        {/* 7 Columns of images to make them smaller and denser */}
                        {[0, 1, 2, 3, 4, 5, 6].map((colIndex) => (
                            <div key={`col-${colIndex}`} className={`gallery-column col-${colIndex}`}>
                                {/* Generate masonry-like staggered heights per column */}
                                {[...galleryImages, ...galleryImages].map((imgUrl, i) => {
                                    // Stagger the starting image index per column for visual variety
                                    const actualImgUrl = galleryImages[(i + colIndex * 3) % galleryImages.length];
                                    const altText = galleryAlts[(i + colIndex) % galleryAlts.length];
                                    
                                    // Array of varied heights to create the masonry/staggered look
                                    const heights = ['20vh', '30vh', '15vh', '35vh', '25vh', '32vh'];
                                    const variedHeight = heights[(i + colIndex * 2) % heights.length];
                                    
                                    return (
                                        <div key={`img-${colIndex}-${i}`} className="gallery-item" style={{ height: variedHeight }}>
                                            <Image
                                                src={optimizeCld(actualImgUrl)}
                                                alt={altText}
                                                fill
                                                className="hero-gallery-img"
                                                sizes="(max-width: 768px) 25vw, 15vw"
                                                priority={i < 5}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    
                    {/* Overlay so text stays readable and adds grain filter */}
                    <div className="hero-gallery-overlay" aria-hidden="true" />
                    
                    <div className="hero-content-center" style={{ position: 'relative', zIndex: 2 }}>
                        <h1 className="sr-only">Nuestra Historia | HiveYoung</h1>
                        <div className="title-wrapper">
                            <svg className="hero-title-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                                <text x="400" y="200" textAnchor="middle" className="drawn-text" fill="transparent" stroke="#ffffff" strokeWidth="1.5" fontSize="130" fontWeight="900" fontFamily="Poppins, sans-serif">NUESTRA</text>
                                <text x="400" y="380" textAnchor="middle" className="drawn-text" fill="transparent" stroke="#ffffff" strokeWidth="1.5" fontSize="130" fontWeight="900" fontFamily="Poppins, sans-serif">HISTORIA</text>
                            </svg>
                        </div>
                    </div>
                    
                    {/* Scroll Down Indicator */}
                    <div className="hero-scroll-indicator" style={{ position: 'absolute', bottom: '5vh', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.8 }}>
                        <ChevronDown size={36} color="white" className="bounce-animation" />
                    </div>
                </section>

                <div ref={trackRef} className="horizontal-track" style={{ zIndex: 2, position: 'relative' }}>
                    {historyItems.map((item, index) => (
                        <div key={item.id} className={`horizontal-panel panel-theme-${item.theme} ${index === 0 ? 'panel-first' : ''}`}>
                            {item.type !== 'text-only' && (
                                <>
                                    <div className="timeline-dot"></div>
                                    <div className="mobile-timeline-dot"></div>
                                </>
                            )}
                            
                            {item.type === 'text-only' ? (
                                <div className="panel-text-col panel-text-centered" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100vw', maxWidth: '1100px', margin: '0 auto', textAlign: 'center', padding: '0 2rem', position: 'relative' }}>
                                    <FloatingNames />

                                    <div style={{ maxWidth: '800px', position: 'relative', zIndex: 20 }}>
                                        <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', fontWeight: 600, marginBottom: '0.8rem', lineHeight: 1.2, color: 'white', opacity: 1 }}>{item.title}</h3>
                                        <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 400, lineHeight: 1.5, color: 'white', opacity: 1, maxWidth: '600px', margin: '0 auto' }}>{item.subtitle}</p>
                                    </div>
                                    {/* Mobile-only notice for better UX */}
                                    <div className="mobile-pc-notice">
                                        Descubre todos los nombres desde tu PC
                                    </div>
                                </div>
                            ) : (
                                <div className={`fullscreen-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                                    <div className="panel-text-col">
                                        {index < historyItems.length - 1 && item.year && (
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
                                                    priority={true}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

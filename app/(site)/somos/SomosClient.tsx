"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SOMOS_VALUES } from '@/data/somos-values';
import useScrollReveal from '@/hooks/useScrollReveal';
import CircleMarker from '@/components/CircleMarker';
import './Somos.css';

const SomosClient = () => {
    useScrollReveal();
    const mainRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const disruptiveRef = useRef<HTMLSpanElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef);
    const [isHovering, setIsHovering] = useState(false);
    const isTransitioning = useRef(false);

    // Track scroll within the extended hero section
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const [hasWarped, setHasWarped] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin);

        const ctx = gsap.context(() => {
            gsap.set('.somos-drawn-text', { opacity: 0, strokeDasharray: 3000, strokeDashoffset: 3000 });
            
            // Initial state for warp text
            gsap.set('.warp-reveal-text', { 
                scaleY: 0, 
                opacity: 0, 
                filter: 'blur(15px)',
                transformOrigin: '50% 50%' 
            });

            const tl = gsap.timeline({ delay: 0.5 });

            tl.to('.somos-drawn-text', {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0.1
            })
                .to('.somos-drawn-text', {
                    fill: "white",
                    duration: 0.6,
                    ease: "power1.inOut"
                }, "-=0.8");
        }, mainRef);

        return () => ctx.revert();
    }, []);

    // Kinetic Warp Reveal Trigger
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            if (latest > 0.18 && !hasWarped) {
                setHasWarped(true);
                const tl = gsap.timeline();
                
                // DISRUPTIVE WARP: Vertical stretch + Flash reveal
                tl.to('.warp-reveal-text', {
                    opacity: 1,
                    scaleY: 3,
                    filter: 'blur(5px)',
                    duration: 0.1,
                    ease: "power2.in"
                })
                .to('.warp-reveal-text', {
                    scaleY: 1,
                    filter: 'blur(0px)',
                    color: '#ffc4d4',
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)"
                })
                .to('.warp-reveal-text', {
                    textShadow: '0 0 20px rgba(255, 196, 212, 0.8)',
                    duration: 0.1
                })
                .to('.warp-reveal-text', {
                    textShadow: '0 0 0px rgba(255, 196, 212, 0)',
                    duration: 0.4
                });
                  
            } else if (latest < 0.10 && hasWarped) {
                setHasWarped(false);
                gsap.set('.warp-reveal-text', { 
                    scaleY: 0, 
                    opacity: 0, 
                    filter: 'blur(15px)',
                    color: '#ffffff'
                });
            }
        });
    }, [scrollYProgress, hasWarped]);

    // Title: Fades out, moves up, and blurs out (Very slow now)
    const opacityTitle = useTransform(scrollYProgress, [0.02, 0.12], [1, 0]);
    const yTitle = useTransform(scrollYProgress, [0.02, 0.12], [0, -50]);
    const blurTitle = useTransform(scrollYProgress, [0.02, 0.12], ["blur(0px)", "blur(10px)"]);

    // Intro text 1: NEW - Appearance (0.15 to 0.22), Stay, Exit (0.35 to 0.45)
    const opacityIntro1 = useTransform(scrollYProgress, [0.15, 0.22, 0.35, 0.45], [0, 1, 1, 0]);
    const yIntro1 = useTransform(scrollYProgress, [0.15, 0.22, 0.35, 0.45], [30, 0, 0, -30]);
    const blurIntro1 = useTransform(scrollYProgress, [0.15, 0.22, 0.35, 0.45], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Intro text 2: Main purpose - Appearance (0.55 to 0.65). EXTREME STAY until 0.92
    const opacityIntro = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const yIntro = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
    const blurIntro = useTransform(scrollYProgress, [0.55, 0.65], ["blur(10px)", "blur(0px)"]);

    // CREATIVE DRIFT EFFECT: Subtle sideways movement while scrolling
    const drift1 = useTransform(scrollYProgress, [0.15, 0.45], [0, -40]);
    const drift2 = useTransform(scrollYProgress, [0.55, 0.92], [0, 40]);

    // Border radius: Stays rectangular longer, curves only at the very end (0.92 to 0.98)
    const borderRadius = useTransform(
        scrollYProgress,
        [0.92, 0.98],
        ["0% 0% 0% 0% / 0% 0% 0% 0%", "0% 0% 50% 50% / 0% 0% 60px 60px"]
    );

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const values = SOMOS_VALUES;

    // Extended values for infinite carousel
    const extendedValues = [...values, ...values, ...values, ...values, ...values, ...values];

    const getSingleSetWidth = useCallback(() => {
        if (!carouselRef.current || !carouselRef.current.children.length) return 0;
        const container = carouselRef.current;
        const firstCard = container.children[0] as HTMLElement;
        const secondCard = container.children[1] as HTMLElement;

        const itemStride = container.children.length > 1
            ? secondCard.offsetLeft - firstCard.offsetLeft
            : firstCard.offsetWidth;

        return itemStride * values.length;
    }, [values.length]);

    const handleScroll = useCallback(() => {
        if (!carouselRef.current) return;
        const { scrollLeft } = carouselRef.current;
        const singleSetWidth = getSingleSetWidth();
        if (!singleSetWidth) return;

        if (scrollLeft <= 5) {
            carouselRef.current.scrollLeft = (singleSetWidth * 2);
        } else if (scrollLeft >= (singleSetWidth * 3) - 5) {
            carouselRef.current.scrollLeft = scrollLeft - (singleSetWidth * 2);
        }
    }, [getSingleSetWidth]);

    const scrollCarousel = useCallback((direction: 'left' | 'right') => {
        if (carouselRef.current && !isTransitioning.current) {
            isTransitioning.current = true;
            const { current } = carouselRef;
            const setWidth = getSingleSetWidth();
            const scrollAmount = setWidth / values.length;

            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }

            setTimeout(() => {
                isTransitioning.current = false;
            }, 400);
        }
    }, [getSingleSetWidth]);

    // Auto-play Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isHovering && isInView) {
            interval = setInterval(() => {
                scrollCarousel('right');
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isHovering, isInView, scrollCarousel]);

    useEffect(() => {
        if (carouselRef.current) {
            requestAnimationFrame(() => {
                const setWidth = getSingleSetWidth();
                if (carouselRef.current) {
                    carouselRef.current.scrollLeft = setWidth;
                }
            });
        }
    }, [getSingleSetWidth]);

    return (
        <div className="somos-page" ref={mainRef}>
            <div className="somos-scroll-track" ref={targetRef}>
                <div className="somos-sticky-view">
                    <motion.div
                        className="somos-hero-image-wrapper"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456528/grupal_1_hrhwef.jpg"
                            alt="Quienes Somos HiveYoung"
                            width={1200}
                            height={800}
                            className="somos-hero-image"
                            draggable={false}
                        />
                        <div className="somos-overlay"></div>
                    </motion.div>

                    <div className="somos-hero-content">
                        <h1 className="sr-only">¿Quiénes Somos? | HiveYoung</h1>
                        <motion.div
                            className="somos-hero-title-wrapper"
                            aria-hidden="true"
                            style={{
                                opacity: opacityTitle,
                                y: yTitle,
                                filter: blurTitle
                            }}
                        >
                            <svg className="somos-hero-title-svg" viewBox="0 0 3000 800" preserveAspectRatio="xMidYMid meet">
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    className="somos-drawn-text"
                                    fill="transparent"
                                    stroke="white"
                                    strokeWidth="4.5"
                                    style={{
                                        fontSize: '280px',
                                        fontWeight: 900,
                                        fontFamily: 'Poppins, sans-serif',
                                        textTransform: 'uppercase',
                                        letterSpacing: '10px'
                                    }}
                                >¿Quiénes Somos?</text>
                            </svg>
                        </motion.div>

                        <motion.div
                            className="somos-hero-intro"
                            style={{
                                opacity: opacityIntro1,
                                y: yIntro1,
                                filter: blurIntro1
                            }}
                        >
                            <p className="light-intro-text">
                                Somos una{" "}
                                <span className="warp-reveal-text" style={{ color: '#ffc4d4', fontWeight: 600 }}>
                                    organización juvenil
                                </span>{" "}
                                que capta, conecta e impulsa a las nuevas generaciones, empoderándolas para desarrollar sus habilidades y convertirse en agentes de cambio.
                            </p>
                        </motion.div>

                        <motion.div
                            className="somos-hero-intro"
                            style={{
                                opacity: opacityIntro,
                                y: yIntro,
                                filter: blurIntro
                            }}
                        >
                            <p className="light-intro-text">
                                HiveYoung nace con el propósito de{' '}
                                <CircleMarker color="#5CD494" delay={0.1} scrollProgress={scrollYProgress}>conectar</CircleMarker>,{' '}
                                <CircleMarker color="#74b8f9" delay={0.3} scrollProgress={scrollYProgress}>potenciar</CircleMarker> y{' '}
                                <CircleMarker color="#ffc4d4" delay={0.5} scrollProgress={scrollYProgress}>visibilizar</CircleMarker>{' '}
                                el talento joven en Chile y Latinoamérica.
                                Creemos profundamente en el poder de la juventud para transformar la sociedad y generar impacto positivo
                                a través de la acción colectiva y el liderazgo consciente.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="somos-container">
                <div className="somos-mission-vision section-spacer">
                    <motion.div
                        className="mv-item"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <h2>Nuestra Misión</h2>
                        <div className="mv-underline"></div>
                        <p>
                            Inspirar a la juventud a desafiar sus límites, empoderándola para desarrollar sus
                            habilidades y pasiones, y así formar agentes de cambio capaces de generar un impacto positivo en sus comunidades.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mv-item"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>Nuestra Visión</h2>
                        <div className="mv-underline vision"></div>
                        <p>
                            Ser el principal articulador del ecosistema juvenil y la plataforma líder en Latinoamérica 
                            que impulsa a una nueva generación de agentes de cambio y proyectos de impacto.
                        </p>
                    </motion.div>
                </div>

                <section className="valores-section">
                    <div className="valores-annotations-container" aria-hidden="true">
                        <Image 
                            src="/images/Draws/Pluralidad.svg" 
                            alt="" 
                            width={180} 
                            height={90} 
                            className="valor-annotation-img pluralidad reveal"
                        />
                        <Image 
                            src="/images/Draws/Pensamiento Libre.svg" 
                            alt="" 
                            width={180} 
                            height={90} 
                            className="valor-annotation-img pensamiento reveal"
                        />
                        <Image 
                            src="/images/Draws/Originalidad.svg" 
                            alt="" 
                            width={210} 
                            height={105} 
                            className="valor-annotation-img originalidad reveal"
                        />
                        <Image 
                            src="/images/Draws/Trabajo en Equipo.svg" 
                            alt="" 
                            width={190} 
                            height={95} 
                            className="valor-annotation-img equipo reveal"
                        />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Nuestros <span className="mobile-break">Valores</span>
                    </motion.h2>
                    <div className="valores-underline"></div>

                    <div
                        className="valores-carousel-wrapper"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <button
                            className="carousel-arrow arrow-left"
                            onClick={() => scrollCarousel('left')}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} color="white" />
                        </button>

                        <div className="valores-viewport">
                            <motion.div
                                className="valores-grid"
                                ref={carouselRef}
                                onScroll={handleScroll}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {extendedValues.map((val, index) => (
                                    <div
                                        key={index}
                                        className="valor-card"
                                        style={{ '--valor-color': val.color } as React.CSSProperties}
                                    >
                                        <div className="valor-icon-box">
                                            <span className="valor-icon">{val.icon}</span>
                                        </div>
                                        <h3>{val.title}</h3>
                                        <p>{val.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <button
                            className="carousel-arrow arrow-right"
                            onClick={() => scrollCarousel('right')}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} color="white" />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SomosClient;

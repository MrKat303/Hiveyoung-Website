"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SOMOS_VALUES } from '@/data/somos-values';
import useScrollReveal from '@/hooks/useScrollReveal';
import './Somos.css';

const SomosClient = () => {
    useScrollReveal();
    const mainRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef);
    const [isHovering, setIsHovering] = useState(false);
    const isTransitioning = useRef(false);

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin);

        const ctx = gsap.context(() => {
            gsap.set('.somos-drawn-text', { opacity: 0, strokeDasharray: 3000, strokeDashoffset: 3000 });

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

    // Track scroll within the extended hero section
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // Title: Fades out, moves up, and blurs out rapidly
    const opacityTitle = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
    const yTitle = useTransform(scrollYProgress, [0.05, 0.25], [0, -50]);
    const blurTitle = useTransform(scrollYProgress, [0.05, 0.25], ["blur(0px)", "blur(10px)"]);

    // Intro text: Blurs in and fades in, then stays visible
    const opacityIntro = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
    const yIntro = useTransform(scrollYProgress, [0.3, 0.55], [50, 0]);
    const blurIntro = useTransform(scrollYProgress, [0.3, 0.55], ["blur(10px)", "blur(0px)"]);

    // Border radius: Rectangular mostly, curves at the very end to transition
    const borderRadius = useTransform(
        scrollYProgress,
        [0.8, 0.85],
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

        return itemStride * 5;
    }, []);

    const handleScroll = useCallback(() => {
        if (!carouselRef.current) return;
        const { scrollLeft } = carouselRef.current;
        const singleSetWidth = getSingleSetWidth();
        if (!singleSetWidth) return;

        if (scrollLeft <= 5) {
            carouselRef.current.scrollLeft = (singleSetWidth * 4);
        } else if (scrollLeft >= (singleSetWidth * 5) - 5) {
            carouselRef.current.scrollLeft = scrollLeft - (singleSetWidth * 4);
        }
    }, [getSingleSetWidth]);

    const scrollCarousel = useCallback((direction: 'left' | 'right') => {
        if (carouselRef.current && !isTransitioning.current) {
            isTransitioning.current = true;
            const { current } = carouselRef;
            const setWidth = getSingleSetWidth();
            const scrollAmount = setWidth / 5;

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
                            alt="Equipo HiveYoung"
                            width={1200}
                            height={800}
                            className="somos-hero-image"
                            draggable={false}
                        />
                        <div className="somos-overlay"></div>
                    </motion.div>

                    <div className="somos-hero-content">
                        <motion.div
                            className="somos-hero-title-wrapper"
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
                                opacity: opacityIntro,
                                y: yIntro,
                                filter: blurIntro
                            }}
                        >
                            <p>
                                HiveYoung nace con el propósito de conectar, potenciar y visibilizar el talento joven en Chile y Latinoamérica.
                                Creemos profundamente en el poder de la juventud para transformar la sociedad y generar impacto positivo
                                a través de la acción colectiva y el liderazgo consciente.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="somos-container">
                <div className="somos-new-grid section-spacer">
                    {/* LEFT: NUESTRA HISTORIA */}
                    <motion.div
                        className="historia-main-card"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <Image
                            src="https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681079/IMG_2062-Mejorado-NR_shgago.jpg"
                            alt="Nuestra Historia HiveYoung"
                            fill
                            className="historia-bg-image"
                        />
                        <div className="historia-card-overlay">
                            <div className="historia-card-content">
                                <h2>Nuestra Historia</h2>
                                <p>Descubre cómo un grupo de jóvenes decidió transformar el ecosistema juvenil en Chile.</p>
                                <a href="/historia" className="historia-btn">
                                    Conocer nuestra historia
                                    <ChevronRight size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: MISION & VISION STACKED */}
                    <div className="mision-vision-stack">
                        <motion.div
                            className="mv-card mision-card"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div className="mv-card-inner">
                                <h2>Nuestra Misión</h2>
                                <p>
                                    Articular y potenciar el ecosistema juvenil, conectando a líderes emergentes con oportunidades de desarrollo,
                                    mentores de clase mundial y organizaciones clave.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="mv-card vision-card"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="mv-card-inner">
                                <h2>Nuestra Visión</h2>
                                <p>
                                    Ser la plataforma líder en Latinoamérica que impulsa el talento joven, construyendo una red colaborativa
                                    resiliente que transforma desafíos regionales en oportunidades.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <section className="valores-section">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Nuestros Valores
                    </motion.h2>

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

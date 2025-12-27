"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Handshake, Heart, Globe, Lightbulb, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';
import './Somos.css';

const SomosClient = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef);
    const [isHovering, setIsHovering] = useState(false);
    const isTransitioning = useRef(false);

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

    const values = [
        {
            icon: <Handshake size={40} strokeWidth={2} color="#2eb67d" />,
            title: "Colaboración",
            color: "#2eb67d",
            description: "Construimos puentes y alianzas estratégicas. Entendemos que el impacto colectivo es más fuerte que el esfuerzo individual."
        },
        {
            icon: <Heart size={40} strokeWidth={2} color="#529ce8" />,
            title: "Compromiso",
            color: "#529ce8",
            description: "Nos entregamos con pasión y responsabilidad a nuestra causa, trabajando incansablemente por el bienestar de las juventudes."
        },
        {
            icon: <Globe size={40} strokeWidth={2} color="#c22359" />,
            title: "Diversidad e Inclusión",
            color: "#c22359",
            description: "Valoramos y celebramos la riqueza de las diferencias, creando espacios seguros donde todas las identidades pueden florecer."
        },
        {
            icon: <Lightbulb size={40} strokeWidth={2} color="#ffc100" />,
            title: "Creatividad e Innovación",
            color: "#ffc100",
            description: "Abrazamos el cambio y buscamos soluciones disruptivas. No tenemos miedo a pensar diferente para resolver los desafíos del futuro."
        },
        {
            icon: <Megaphone size={40} strokeWidth={2} color="#ee6352" />,
            title: "Incidencia",
            color: "#ee6352",
            description: "Alzamos la voz y actuamos para influir en las políticas públicas, posicionando a los jóvenes en el centro de la toma de decisiones."
        }
    ];

    // Extended values for infinite carousel
    const extendedValues = [...values, ...values, ...values, ...values, ...values, ...values];

    // Auto-play Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isHovering && isInView) {
            interval = setInterval(() => {
                scrollCarousel('right');
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isHovering, isInView]);

    const getSingleSetWidth = () => {
        if (!carouselRef.current || !carouselRef.current.children.length) return 0;
        const container = carouselRef.current;
        const firstCard = container.children[0] as HTMLElement;
        const secondCard = container.children[1] as HTMLElement;

        const itemStride = container.children.length > 1
            ? secondCard.offsetLeft - firstCard.offsetLeft
            : firstCard.offsetWidth;

        return itemStride * 5;
    };

    useEffect(() => {
        if (carouselRef.current) {
            requestAnimationFrame(() => {
                const setWidth = getSingleSetWidth();
                if (carouselRef.current) {
                    carouselRef.current.scrollLeft = setWidth;
                }
            });
        }
    }, []);

    const handleScroll = () => {
        if (!carouselRef.current) return;
        const { scrollLeft } = carouselRef.current;
        const singleSetWidth = getSingleSetWidth();
        if (!singleSetWidth) return;

        if (scrollLeft <= 5) {
            carouselRef.current.scrollLeft = (singleSetWidth * 4);
        } else if (scrollLeft >= (singleSetWidth * 5) - 5) {
            carouselRef.current.scrollLeft = scrollLeft - (singleSetWidth * 4);
        }
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
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
    };

    return (
        <div className="somos-page">
            <div className="somos-scroll-track" ref={targetRef}>
                <div className="somos-sticky-view">
                    <motion.div
                        className="somos-hero-image-wrapper"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            borderRadius: borderRadius as any,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src="/images/somos/grupal (1).JPG"
                            alt="Equipo HiveYoung"
                            width={1200}
                            height={800}
                            className="somos-hero-image"
                            draggable={false}
                        />
                        <div className="somos-overlay"></div>
                    </motion.div>

                    <div className="somos-hero-content">
                        <motion.h1
                            className="somos-hero-title absolute-center"
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ opacity: opacityTitle, y: yTitle, filter: blurTitle }}
                        >
                            ¿Quiénes Somos?
                        </motion.h1>

                        <motion.div
                            className="somos-hero-intro absolute-center"
                            style={{ opacity: opacityIntro, y: yIntro, filter: blurIntro }}
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
                <div className="somos-grid section-spacer">
                    <motion.div
                        className="mision-vision-card"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <h2>Nuestra Misión</h2>
                        <p>
                            Articular y potenciar el ecosistema juvenil, conectando a líderes emergentes con oportunidades de desarrollo,
                            mentores de clase mundial y organizaciones clave. Trabajamos para derribar barreras y maximizar el impacto
                            de las iniciativas lideradas por jóvenes.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mision-vision-card"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>Nuestra Visión</h2>
                        <p>
                            Ser la plataforma líder en Latinoamérica que impulsa el talento joven, construyendo una red colaborativa
                            resiliente que transforma desafíos locales y globales en oportunidades, generando cambios sistémicos
                            y sostenibles para el futuro.
                        </p>
                    </motion.div>
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

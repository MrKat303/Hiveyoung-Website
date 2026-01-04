"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import './Login.css';

gsap.registerPlugin(ScrollTrigger);

export default function LoginPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const parallaxTextRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const targetDate = new Date('2026-03-09T00:00:00').getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        // Navbar appear
        ScrollTrigger.create({
            trigger: ".hero-section",
            start: "bottom top",
            onEnter: () => navbarRef.current?.classList.add('visible'),
            onLeaveBack: () => navbarRef.current?.classList.remove('visible')
        });

        // Parallax text rotation
        gsap.to(parallaxTextRef.current, {
            rotation: 360,
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // COLOR CHANGES
        const colors = [
            { el: ".hero-section", color: "#ff715b", start: "top top" },
            { el: ".marquee-1", color: "#0a0a0a", start: "top center" },
            { el: ".section-1", color: "#7a78ff", start: "top center" },
            { el: ".marquee-2", color: "#7a78ff", start: "top center" },
            { el: ".section-2", color: "#c7ff6a", start: "top center" },
            { el: ".marquee-3", color: "#0a0a0a", start: "top center" },
            { el: ".section-3", color: "#ffffff", start: "top center" },
            { el: ".marquee-4", color: "#ff715b", start: "top center" },
            { el: ".section-4", color: "#0a0a0a", start: "top center" },
            { el: ".marquee-5", color: "#7a78ff", start: "top center" },
            { el: ".section-5", color: "#c7ff6a", start: "top center" },
            { el: ".section-final", color: "#0a0a0a", start: "top center" }
        ];

        colors.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item.el,
                start: item.start,
                onEnter: () => {
                    gsap.to(container, {
                        backgroundColor: item.color,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        gsap.to(container, {
                            backgroundColor: colors[index - 1].color,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                }
            });
        });

        // Background shapes parallax
        gsap.utils.toArray<HTMLElement>(".bg-shape").forEach((shape, i) => {
            gsap.to(shape, {
                y: (i + 1) * -300,
                rotation: 360,
                scrollTrigger: {
                    trigger: shape,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
        });

        // Rotate elements on scroll
        gsap.utils.toArray<HTMLElement>(".rotate-scroll").forEach((el) => {
            gsap.to(el, {
                rotation: 360,
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });
        });

        // Fade animations
        gsap.utils.toArray<HTMLElement>(".fade-in").forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => el.classList.add('visible'),
                onLeaveBack: () => el.classList.remove('visible')
            });
        });

        // Scale animations
        gsap.utils.toArray<HTMLElement>(".scale-in").forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => el.classList.add('visible'),
                onLeaveBack: () => el.classList.remove('visible')
            });
        });

        // Slide animations
        gsap.utils.toArray<HTMLElement>(".slide-in-left, .slide-in-right").forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => el.classList.add('visible'),
                onLeaveBack: () => el.classList.remove('visible')
            });
        });

        // Initial countdown animation
        gsap.from(".countdown-item", {
            opacity: 0,
            scale: 0.3,
            y: 150,
            rotation: -15,
            duration: 1.5,
            stagger: 0.2,
            ease: "back.out(2)",
            delay: 0.3
        });

        gsap.from(".countdown-subtitle", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.5
        });

        // Marquee hover effect
        gsap.utils.toArray<HTMLElement>(".marquee").forEach((marquee) => {
            marquee.addEventListener("mouseenter", () => {
                gsap.to(marquee.querySelector(".marquee-content"), {
                    animationDuration: "15s",
                    ease: "none"
                });
            });
            marquee.addEventListener("mouseleave", () => {
                gsap.to(marquee.querySelector(".marquee-content"), {
                    animationDuration: "25s",
                    ease: "none"
                });
            });
        });

    }, { scope: containerRef });

    return (
        <div className="launch-container" ref={containerRef}>
            <div className="noise"></div>
            <div className="parallax-text" ref={parallaxTextRef}>HIVEYOUNG</div>

            {/* NAVBAR */}
            <div className="countdown-navbar" ref={navbarRef}>
                <div className="countdown-navbar-content">
                    <div className="countdown-navbar-timer">
                        {[
                            { value: timeLeft.days, label: 'DÍAS' },
                            { value: timeLeft.hours, label: 'HORAS' },
                            { value: timeLeft.minutes, label: 'MIN' },
                            { value: timeLeft.seconds, label: 'SEG' }
                        ].map((item, i) => (
                            <div key={i} className="countdown-navbar-item">
                                <span className="countdown-navbar-number">{item.value}</span>
                                <span className="countdown-navbar-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HERO - NARANJA */}
            <section className="hero-section">
                <div className="countdown-display">
                    {[
                        { value: timeLeft.days, label: 'DÍAS' },
                        { value: timeLeft.hours, label: 'HORAS' },
                        { value: timeLeft.minutes, label: 'MIN' },
                        { value: timeLeft.seconds, label: 'SEG' }
                    ].map((item, i) => (
                        <div key={i} className="countdown-item">
                            <span className="countdown-number">{item.value}</span>
                            <span className="countdown-label">{item.label}</span>
                        </div>
                    ))}
                </div>
                <p className="countdown-subtitle">HIVEYOUNG ESTÁ LLEGANDO</p>
            </section>

            {/* MARQUEE 1 - NEGRO */}
            <div className="marquee marquee-black marquee-1">
                <div className="marquee-content">
                    COLABORA CON JÓVENES // ENCUENTRA TU PARTNER // APRENDE Y CRECE // COLABORA CON JÓVENES //
                </div>
            </div>

            {/* SECTION 1 - PÚRPURA */}
            <section className="full-section section-1">
                <div className="bg-shape circle bg-shape-1" style={{ color: 'rgba(255, 255, 255, 0.1)' }}></div>
                <div className="section-content">
                    <h1 className="mega-title scale-in">
                        TU EQUIPO.<br />
                        TUS <span className="glitch" data-text="IDEAS.">IDEAS.</span><br />
                        TU FUTURO.
                    </h1>
                </div>
            </section>

            {/* MARQUEE 2 - PÚRPURA */}
            <div className="marquee marquee-purple marquee-2">
                <div className="marquee-content">
                    CONECTA CON TALENTO // CREA PROYECTOS // TRANSFORMA IDEAS // CONECTA CON TALENTO //
                </div>
            </div>

            {/* SECTION 2 - LIMA */}
            <section className="full-section section-2">
                <div className="bg-shape bg-shape-2" style={{ color: 'rgba(10, 10, 10, 0.1)' }}></div>
                <div className="section-content">
                    <h2 className="medium-title slide-in-left" style={{ color: '#0a0a0a' }}>
                        COLABORATIVO<br />
                        INNOVADOR<br />
                        <span style={{ color: '#ff715b' }}>REAL.</span>
                    </h2>
                    <p className="body-text fade-in" style={{ color: '#0a0a0a', marginTop: '3rem', opacity: 0.9 }}>
                        Encuentra partners que comparten tu visión. Aprende de mentores. Crea proyectos que importan.
                    </p>
                </div>
            </section>

            {/* MARQUEE 3 - NEGRO */}
            <div className="marquee marquee-black marquee-3">
                <div className="marquee-content">
                    APRENDE HACIENDO // COLABORA GLOBALMENTE // CRECE JUNTOS // APRENDE HACIENDO //
                </div>
            </div>

            {/* SECTION 3 - BLANCO */}
            <section className="full-section section-3">
                <div className="section-content">
                    <h2 className="medium-title scale-in" style={{ color: '#0a0a0a' }}>
                        12,488 JÓVENES<br />
                        <span style={{ color: '#7a78ff' }}>COLABORANDO.</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                        {[
                            { num: '500+', label: 'PROYECTOS' },
                            { num: '80+', label: 'PAÍSES' },
                            { num: '24/7', label: 'COLABORACIÓN' }
                        ].map((stat, i) => (
                            <div key={i} className={i === 0 ? 'slide-in-left' : i === 2 ? 'slide-in-right' : 'fade-in'} style={{ color: '#0a0a0a' }}>
                                <h3 className="rotate-scroll" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontFamily: 'Bebas Neue', marginBottom: '1rem' }}>{stat.num}</h3>
                                <p style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MARQUEE 4 - NARANJA */}
            <div className="marquee marquee-orange marquee-4">
                <div className="marquee-content">
                    LA REVOLUCIÓN COMIENZA // 9 DE MARZO 2026 // ÚNETE AL CAMBIO // LA REVOLUCIÓN COMIENZA //
                </div>
            </div>

            {/* SECTION 4 - NEGRO */}
            <section className="full-section section-4">
                <div className="bg-shape circle bg-shape-1" style={{ color: 'rgba(255, 255, 255, 0.05)' }}></div>
                <div className="section-content">
                    <h2 className="mega-title scale-in distort">
                        LA NUEVA<br />
                        GENERACIÓN<br />
                        ESTÁ <span style={{ color: '#ff715b' }}>AQUÍ.</span>
                    </h2>
                    <p className="body-text fade-in" style={{ marginTop: '3rem', opacity: 0.8 }}>
                        Conecta con jóvenes de todo el mundo. Encuentra el partner perfecto para tu proyecto. Aprende de los mejores.
                        <br /><br />
                        <strong style={{ fontSize: '2rem', color: '#c7ff6a' }}>TODO EN UN LUGAR.</strong>
                    </p>
                </div>
            </section>

            {/* MARQUEE 5 - PÚRPURA */}
            <div className="marquee marquee-purple marquee-5">
                <div className="marquee-content">
                    ENCUENTRA TU EQUIPO // APRENDE SKILLS // CREA IMPACTO // ENCUENTRA TU EQUIPO //
                </div>
            </div>

            {/* SECTION 5 - LIMA */}
            <section className="full-section section-5">
                <div className="bg-shape bg-shape-2" style={{ color: 'rgba(10, 10, 10, 0.1)' }}></div>
                <div className="section-content">
                    <h2 className="mega-title slide-in-right" style={{ color: '#0a0a0a' }}>
                        TÚ ERES<br />
                        EL <span style={{ color: '#ff715b' }}>FUTURO.</span>
                    </h2>
                </div>
            </section>

            {/* FINAL - NEGRO */}
            <section className="full-section section-final">
                <div className="section-content">
                    <h2 className="mega-title scale-in" style={{ marginBottom: '4rem' }}>
                        ¿ESTÁS<br />
                        <span className="glitch" data-text="LISTO?" style={{ color: '#c7ff6a' }}>LISTO?</span>
                    </h2>
                    <Link href="/" className="cta-button fade-in">
                        ENTRAR A HIVEYOUNG
                    </Link>
                </div>
            </section>
        </div>
    );
}

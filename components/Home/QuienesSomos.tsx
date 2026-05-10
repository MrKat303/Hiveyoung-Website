"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './QuienesSomos.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QuienesSomos = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP((context, contextSafe) => {
        // Title animation
        gsap.fromTo('.qs-title', 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: '.qs-title-wrapper', start: "top 85%" }
            }
        );

        // Description animation
        gsap.fromTo('.qs-description', 
            { opacity: 0, x: -30 },
            { 
                opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2,
                scrollTrigger: { trigger: '.qs-description-wrapper', start: "top 80%" }
            }
        );

        // Buttons stagger
        gsap.fromTo('.qs-btn', 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)",
                scrollTrigger: { trigger: '.qs-actions', start: "top 90%" }
            }
        );

        // Accent line drawing
        gsap.fromTo('.qs-accent-line',
            { scaleX: 0 },
            { 
                scaleX: 1, duration: 1.5, ease: "power4.out", transformOrigin: "left center",
                scrollTrigger: { trigger: '.qs-accent-line', start: "top 95%" }
            }
        );

        // Annotations dynamic entry and continuous float
        gsap.utils.toArray('.qs-annotation-img').forEach((el: any, i) => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: el, start: "top 90%" }
            });
            
            tl.fromTo(el, 
                { scale: 0, rotation: gsap.utils.random(-20, 20), opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.5)", delay: i * 0.15 }
            ).to(el, {
                y: gsap.utils.random(-10, 10),
                x: gsap.utils.random(-5, 5),
                rotation: gsap.utils.random(-3, 3),
                duration: gsap.utils.random(2.5, 4),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

    }, { scope: containerRef });

    return (
        <section className="quienes-somos-home" ref={containerRef}>
            <div className="quienes-somos-container">
                <div className="qs-content">
                    <div className="qs-title-wrapper">
                        <div className="qs-annotation" aria-hidden="true">
                            <Image 
                                src="/images/home/Salida de tu zona de confort.svg" 
                                alt="" 
                                width={180} 
                                height={90} 
                                className="qs-annotation-img"
                                draggable={false}
                            />
                        </div>
                        <h2 className="qs-title">¿QUIÉNES<br />SOMOS?</h2>
                    </div>
                    <div className="qs-description-wrapper">
                        <div className="qs-annotation-bottom" aria-hidden="true">
                            <Image 
                                src="/images/home/Generación sin barreras.svg" 
                                alt="" 
                                width={160} 
                                height={80} 
                                className="qs-annotation-img"
                                draggable={false}
                            />
                        </div>
                        <p className="qs-description" data-nosnippet>
                            Somos una <strong>organización juvenil</strong> que busca impulsar el talento, 
                            las ideas y el potencial de las nuevas generaciones.
                        </p>
                        <div className="qs-annotation-top-right" aria-hidden="true">
                            <Image 
                                src="/images/home/Liderazgo Con Proposito.svg" 
                                alt="" 
                                width={180} 
                                height={90} 
                                className="qs-annotation-img"
                                draggable={false}
                            />
                        </div>
                        <div className="qs-annotation-right" aria-hidden="true">
                            <Image 
                                src="/images/home/Proyectos con Impacto.svg" 
                                alt="" 
                                width={180} 
                                height={90} 
                                className="qs-annotation-img"
                                draggable={false}
                            />
                        </div>
                    </div>
                    
                    <div className="qs-actions">
                        <Link href="/somos" className="qs-btn qs-btn-primary">
                            Más sobre nosotros
                        </Link>
                        <Link href="/historia" className="qs-btn qs-btn-secondary">
                            Nuestra Historia
                        </Link>
                    </div>

                    <div className="qs-accent-line"></div>
                </div>
            </div>
        </section>
    );
};

export default QuienesSomos;

"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './JoinBanner.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const JoinBanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP((context, contextSafe) => {
        // Timeline linked to scroll progress (scrub)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.join-banner-container',
                start: 'top bottom-=50', // Empieza apenas asoma por abajo
                end: 'top 30%', // Termina cuando llega a la parte superior-media
                scrub: 1, // La animación sigue el scroll
            }
        });

        // 1. El contenedor sube y se expande
        tl.fromTo('.join-banner-container',
            { opacity: 0, y: 150, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, ease: 'none' }
        );

        // 2. La ilustración y el texto emergen dentro del contenedor
        tl.fromTo('.join-draw',
            { opacity: 0, y: 50, scale: 0.8, rotation: -10 },
            { opacity: 1, y: 0, scale: 1, rotation: 0, ease: 'none' },
            "<" // Empieza al mismo tiempo que el contenedor
        );

        tl.fromTo(['.join-banner-title', '.join-banner-description', '.join-banner-action'],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.1, ease: 'none' },
            "<0.2" // Pequeño delay para el texto
        );

    }, { scope: containerRef });

    return (
        <section className="join-banner-section" ref={containerRef}>
            <div className="join-banner-container">
                <div className="join-banner-content">
                    <div className="join-illustration-box">
                        <Image 
                            src="/images/Draws/Captar.png" 
                            alt="" 
                            width={300} 
                            height={300} 
                            className="join-draw"
                            draggable={false}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="join-banner-text">
                        <h2 className="join-banner-title">
                            Sé parte de las iniciativas <br /> 
                            impulsadas por jóvenes
                        </h2>
                        <p className="join-banner-description">
                            ¿Quieres sumarte al equipo y construir iniciativas con impacto? <br /> 
                            ¿O tienes una organización, empresa o proyecto y quieres impulsar iniciativas con nosotros?
                        </p>
                        
                        <div className="join-banner-action">
                            <Link href="/unete" className="join-cta-button">
                                <span>Unirme a HiveYoung</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/contacto" className="join-cta-button secondary">
                                <span>Ser aliado estratégico</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinBanner;

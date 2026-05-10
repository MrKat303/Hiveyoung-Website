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
        // Banner container slide up
        gsap.fromTo('.join-banner-container',
            { opacity: 0, y: 60, scale: 0.98 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: '.join-banner-section', start: 'top 85%' }
            }
        );

        // Illustration float and rotate
        gsap.fromTo('.join-draw',
            { opacity: 0, x: -50, rotation: -15 },
            { 
                opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '.join-banner-section', start: 'top 80%' }
            }
        );
        gsap.to('.join-draw', {
            y: -15, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
        });

        // Text stagger
        gsap.fromTo(['.join-banner-title', '.join-banner-description', '.join-banner-action'],
            { opacity: 0, y: 30 },
            { 
                opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.3,
                scrollTrigger: { trigger: '.join-banner-text', start: 'top 85%' }
            }
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

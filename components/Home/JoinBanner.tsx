"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import './JoinBanner.css';

const JoinBanner = () => {
    useScrollReveal();

    return (
        <section className="join-banner-section reveal">
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

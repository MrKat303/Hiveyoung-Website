"use client";

import Link from 'next/link';
import Image from 'next/image';
import useScrollReveal from '@/hooks/useScrollReveal';
import './QuienesSomos.css';

const QuienesSomos = () => {
    useScrollReveal();

    return (
        <section className="quienes-somos-home">
            <div className="quienes-somos-container">
                <div className="qs-content reveal">
                    <div className="qs-title-wrapper">
                        <div className="qs-annotation">
                            <Image 
                                src="/images/home/Salida de tu zona de confort.svg" 
                                alt="Salida de tu zona de confort" 
                                width={180} 
                                height={90} 
                                className="qs-annotation-img"
                                draggable={false}
                            />
                        </div>
                        <h2 className="qs-title">¿QUIÉNES<br />SOMOS?</h2>
                    </div>
                    <div className="qs-description-wrapper">
                        <div className="qs-annotation-bottom">
                            <Image 
                                src="/images/home/Generación sin barreras.svg" 
                                alt="Generación sin barreras" 
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
                        <div className="qs-annotation-right">
                            <Image 
                                src="/images/home/Proyectos con Impacto.svg" 
                                alt="Proyectos con Impacto" 
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

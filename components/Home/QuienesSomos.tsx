"use client";

import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';
import './QuienesSomos.css';

const QuienesSomos = () => {
    useScrollReveal();

    return (
        <section className="quienes-somos-home">
            <div className="quienes-somos-container">
                <div className="qs-content reveal">
                    <h2 className="qs-title">¿Quiénes Somos?</h2>
                    <p className="qs-description">
                        Somos una <strong>organización juvenil</strong> que busca impulsar el talento, 
                        las ideas y el potencial de las nuevas generaciones.
                    </p>
                    
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

"use client";

import React from 'react';
import Image from 'next/image';
import useScrollReveal from '@/hooks/useScrollReveal';
import './QueHacemos.css';

const QueHacemos = () => {
    useScrollReveal();

    const activities = [
        {
            image: "/images/home/Colaborar.png",
            title: "Impulsamos la Colaboración",
            description: "Trabajamos con una red de aliados para impulsar iniciativas, fortalecer proyectos y abrir espacios para generar impacto colectivo."
        },
        {
            image: "/images/home/Articular.png",
            title: "Articulamos el Ecosistema Juvenil",
            description: "Conectamos jóvenes, proyectos y comunidades para fortalecer los espacios donde el talento y el liderazgo juvenil crecen."
        },
        {
            image: "/images/home/Proyectos.png",
            title: "Generamos Proyectos con Impacto",
            description: "Desarrollamos y ejecutamos iniciativas innovadoras lideradas por jóvenes que buscan generar impacto positivo en la sociedad."
        }
    ];

    return (
        <section className="que-hacemos-section">
            <div className="que-hacemos-container">
                <div className="que-hacemos-header reveal">
                    <h2 className="que-hacemos-title">¿Qué Hacemos?</h2>
                    <p className="que-hacemos-subtitle" data-nosnippet>
                        Construimos y articulamos un ecosistema que conecta talento joven, impulsa ideas y transforma el liderazgo en impacto real.
                    </p>
                </div>

                <div className="que-hacemos-grid">
                    {activities.map((activity, index) => (
                        <div 
                            key={index} 
                            className="que-hacemos-item reveal" 
                        >
                            <div className="qh-image-wrapper">
                                <div className="qh-image-bg"></div>
                                <Image 
                                    src={activity.image} 
                                    alt="" 
                                    width={400} 
                                    height={400} 
                                    className="qh-illustration"
                                    priority={index === 0}
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="qh-text-content" data-nosnippet>
                                <h3>{activity.title}</h3>
                                <div className="qh-item-line"></div>
                                <p>{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QueHacemos;

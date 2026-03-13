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
            title: "Colaborar",
            description: "Trabajamos en conjunto con una red de aliados estratégicos para potenciar el impacto colectivo de las iniciativas juveniles."
        },
        {
            image: "/images/home/Articular.png",
            title: "Articulamos el Ecosistema Juvenil",
            description: "Conectamos los puntos entre jóvenes talentos, mentores y organizaciones para crear una infraestructura de apoyo sólida."
        },
        {
            image: "/images/home/Proyectos.png",
            title: "Creamos proyectos con impacto",
            description: "Desarrollamos y ejecutamos iniciativas que transforman realidades y generan un cambio positivo medible en la sociedad."
        }
    ];

    return (
        <section className="que-hacemos-section">
            <div className="que-hacemos-container">
                <div className="que-hacemos-header reveal">
                    <h2 className="que-hacemos-title">¿Qué Hacemos?</h2>
                    <p className="que-hacemos-subtitle">
                        Trabajamos día a día para transformar el futuro a través del liderazgo juvenil.
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
                                    alt={activity.title} 
                                    width={400} 
                                    height={400} 
                                    className="qh-illustration"
                                    priority={index === 0}
                                />
                            </div>
                            <div className="qh-text-content">
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

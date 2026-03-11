"use client";

import React from 'react';
import Image from 'next/image';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Users, Network, Rocket } from 'lucide-react';
import './QueHacemos.css';

const QueHacemos = () => {
    useScrollReveal();

    const activities = [
        {
            icon: <Users size={48} strokeWidth={1.5} />,
            title: "Colaborar",
            description: "Trabajamos en conjunto con una red de aliados estratégicos para potenciar el impacto colectivo de las iniciativas juveniles.",
            color: "#D1F2E1" // Soft Mint
        },
        {
            icon: <Network size={48} strokeWidth={1.5} />,
            title: "Articulamos el Ecosistema Juvenil",
            description: "Conectamos los puntos entre jóvenes talentos, mentores y organizaciones para crear una infraestructura de apoyo sólida.",
            color: "#C2E9D9" // Soft Seafoam
        },
        {
            icon: <Rocket size={48} strokeWidth={1.5} />,
            title: "Creamos proyectos con impacto",
            description: "Desarrollamos y ejecutamos iniciativas que transforman realidades y generan un cambio positivo medible en la sociedad.",
            color: "#FFF0C2" // Soft Muted Yellow
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
                            className="que-hacemos-card reveal" 
                            style={{ '--accent-color': activity.color } as React.CSSProperties}
                        >
                            <div className="qh-icon-wrapper">
                                {activity.icon}
                            </div>
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                            <div className="qh-card-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QueHacemos;

"use client";

import React from 'react';
import { Users, Rocket, Megaphone } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import './QueHacemos.css';

const QueHacemos = () => {
    useScrollReveal();

    const activities = [
        {
            icon: <Users size={40} />,
            title: "Conectar",
            description: "Creamos redes entre líderes jóvenes, mentores y organizaciones para fortalecer el ecosistema.",
            color: "#5CD494" // Green
        },
        {
            icon: <Rocket size={40} />,
            title: "Potenciar",
            description: "Entregamos herramientas y formación para elevar el talento y las capacidades de los jóvenes.",
            color: "#fecf73" // Yellow
        },
        {
            icon: <Megaphone size={40} />,
            title: "Visibilizar",
            description: "Damos voz y presencia a los proyectos de impacto creados por jóvenes en toda la región.",
            color: "#ffc4d4" // Pink
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

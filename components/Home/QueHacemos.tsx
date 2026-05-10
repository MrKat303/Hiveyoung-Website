"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './QueHacemos.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QueHacemos = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP((context, contextSafe) => {
        // Header parallax/fade
        gsap.fromTo('.que-hacemos-header', 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: '.que-hacemos-header', start: 'top 85%' }
            }
        );

        // Interactive grid staggered entrance
        gsap.fromTo('.que-hacemos-item', 
            { opacity: 0, y: 80, rotationX: 10, scale: 0.95 },
            { 
                opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1, 
                stagger: 0.15, ease: 'back.out(1.4)',
                scrollTrigger: { trigger: '.que-hacemos-grid', start: 'top 80%' }
            }
        );

        // Hover effect for items using contextSafe
        const items = gsap.utils.toArray('.que-hacemos-item');
        items.forEach((item: any) => {
            const image = item.querySelector('.qh-illustration');
            const line = item.querySelector('.qh-item-line');
            
            item.addEventListener('mouseenter', contextSafe(() => {
                gsap.to(image, { scale: 1.08, y: -10, duration: 0.4, ease: 'power2.out' });
                gsap.to(line, { width: '100%', backgroundColor: '#5cd494', duration: 0.4, ease: 'power2.out' });
            }));
            
            item.addEventListener('mouseleave', contextSafe(() => {
                gsap.to(image, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
                gsap.to(line, { width: '40px', backgroundColor: '#3A1B4E', duration: 0.4, ease: 'power2.out' });
            }));
        });

    }, { scope: containerRef });

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
        <section className="que-hacemos-section" ref={containerRef}>
            <div className="que-hacemos-container">
                <div className="que-hacemos-header">
                    <h2 className="que-hacemos-title">¿Qué Hacemos?</h2>
                    <p className="que-hacemos-subtitle" data-nosnippet>
                        Construimos y articulamos un ecosistema que conecta talento joven, impulsa ideas y transforma el liderazgo en impacto real.
                    </p>
                </div>

                <div className="que-hacemos-grid">
                    {activities.map((activity, index) => (
                        <div 
                            key={index} 
                            className="que-hacemos-item" 
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

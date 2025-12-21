"use client";

import React, { useEffect } from 'react';
import './AboutSection.css';

export default function AboutSection() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -100px 0px",
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);
    return (
        <section className="about-section" id="quienes-somos">
            {/* Decorative colored bars at the top transition */}
            <div className="about-bars">
                <div className="bar bar-yellow"></div>
                <div className="bar bar-blue"></div>
                <div className="bar bar-green"></div>
                <div className="bar bar-orange"></div>
                <div className="bar bar-pink"></div>
            </div>

            <div className="about-container reveal">
                <div className="about-tag">
                    <span>¿Quiénes somos?</span>
                </div>

                <h2 className="about-text">
                    Somos una organización juvenil creada por jóvenes que busca <span className="about-highlight">inspirar, empoderar, potenciar, captar y conectar</span> todo el talento joven para generar agentes de cambio.
                </h2>
            </div>
        </section>
    );
}

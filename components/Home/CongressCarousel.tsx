"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CongressCarousel.css';

const images = [
    '/images/congreso/Orquesta.jpg',
    '/images/congreso/Guys.jpg',
    '/images/congreso/Risas.jpg',
];

export default function CongressCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <section className="congress-section">
            <div className="congress-carousel">
                {/* CEINA Logo */}
                <div className="ceina-logo">
                    <img src="/images/congreso/logos/CEINA.png" alt="CEINA" draggable="false" />
                </div>

                {/* Carousel Images */}
                <div className="carousel-container">
                    <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious} aria-label="Previous image">
                        <ChevronLeft size={32} />
                    </button>

                    <div className="carousel-images">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next image">
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Content Overlay */}
                <div className="congress-content">
                    <h2 className="congress-title">Congreso HiveYoung 2025</h2>
                    <p className="congress-details">7 y 8 de Julio - CEINA</p>
                    <a href="/congreso" className="congress-btn">
                        Revive el Congreso
                    </a>
                </div>
            </div>
        </section>
    );
}

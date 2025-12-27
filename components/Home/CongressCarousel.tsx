"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import './CongressCarousel.css';

const images = [
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766510857/Orquesta_1_yzgvao.jpg',
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512697/Participacion_udtvn3.jpg',
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766536322/Guys_1_x2jbh7.jpg',
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512767/IMG_1994-Mejorado-NR_obmhj3.jpg',
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512618/Panel_zz5lbb.jpg',
    'https://res.cloudinary.com/dlipwrbvd/image/upload/v1766536932/Universidades_jvuaal.jpg',
];

export default function CongressCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useScrollReveal();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    return (
        <section className="congress-section">
            <div className="congress-carousel reveal">
                {/* CEINA Logo */}
                <div className="ceina-logo">
                    <Image src="/images/congreso/logos/CEINA.png" alt="CEINA" width={200} height={80} draggable={false} />
                </div>

                {/* Carousel Images */}
                <div className="carousel-container">
                    <button className="congress-carousel-arrow congress-carousel-arrow-left" onClick={goToPrevious} aria-label="Previous image">
                        <ChevronLeft size={32} />
                    </button>

                    <div className="carousel-images">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                                style={{
                                    backgroundImage: `url(${img})`,
                                    backgroundPosition: index === 2 ? 'center 25%' : 'center'
                                }}
                            />
                        ))}
                    </div>

                    <button className="congress-carousel-arrow congress-carousel-arrow-right" onClick={goToNext} aria-label="Next image">
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`congress-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Content Overlay */}
                <div className="congress-content">
                    <div className="congress-info-badge">2025</div>
                    <h2 className="congress-title">CONGRESO HIVEYOUNG</h2>
                    <a href="/congreso" className="congress-btn">
                        Revive el Congreso
                    </a>
                </div>
            </div>
        </section>
    );
}

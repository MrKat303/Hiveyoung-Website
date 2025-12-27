"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import './CongressCarousel.css';

import { CONGRESS_CAROUSEL_IMAGES } from '@/data/congress-carousel';
import { useCarousel } from '@/hooks/useCarousel';

export default function CongressCarousel() {
    const images = CONGRESS_CAROUSEL_IMAGES;
    const { currentIndex, goToNext, goToPrevious, goToIndex } = useCarousel(images.length);

    useScrollReveal();

    const goToSlide = (index: number) => {
        goToIndex(index);
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

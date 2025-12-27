import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
    images: string[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
    const [currSlide, setCurrSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrSlide((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <header className="congreso-hero">
            <div className="hero-carousel">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currSlide}
                        className="hero-slide"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{ backgroundImage: `url(${images[currSlide]})` }}
                    />
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: 2 }}
            >
                <h1 className="hero-title">
                    Congreso <br />
                    <span>HiveYoung</span>
                </h1>
                <p className="hero-tagline">UNA GENERACIÓN SIN BARRERAS</p>
            </motion.div>
        </header>
    );
};

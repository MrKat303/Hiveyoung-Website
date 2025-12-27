import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
    autoPlayInterval?: number;
    loop?: boolean;
}

export function useCarousel(itemCount: number, options: UseCarouselOptions = {}) {
    const { autoPlayInterval = 5000, loop = true } = options;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!autoPlayInterval) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => loop ? (prev + 1) % itemCount : Math.min(prev + 1, itemCount - 1));
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [itemCount, autoPlayInterval, loop]);

    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => loop ? (prev + 1) % itemCount : Math.min(prev + 1, itemCount - 1));
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [itemCount, loop, isTransitioning]);

    const goToPrevious = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => loop ? (prev - 1 + itemCount) % itemCount : Math.max(prev - 1, 0));
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [itemCount, loop, isTransitioning]);

    const goToIndex = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [currentIndex, isTransitioning]);

    return { currentIndex, isTransitioning, goToNext, goToPrevious, goToIndex };
}

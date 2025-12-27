import { useCarousel } from "@/hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface HeroCarouselProps {
    images: string[];
}

export const HeroCarousel = ({ images }: HeroCarouselProps) => {
    const { currentIndex, goToNext, goToPrevious, goToIndex } = useCarousel(images.length, {
        autoPlayInterval: 5000,
    });

    return (
        <div className="hero-carousel">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="hero-slide"
                    style={{
                        backgroundImage: `url(${img})`,
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        zIndex: index === currentIndex ? 2 : 1
                    }}
                />
            ))}

            <button className="congress-carousel-arrow congress-carousel-arrow-left" onClick={goToPrevious}>
                <ChevronLeft size={32} />
            </button>

            <button className="congress-carousel-arrow congress-carousel-arrow-right" onClick={goToNext}>
                <ChevronRight size={32} />
            </button>

            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`congress-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

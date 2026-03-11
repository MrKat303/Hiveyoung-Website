"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'framer-motion';
import './HighlightMarker.css';

interface HighlightMarkerProps {
    children: React.ReactNode;
    color: string;
    delay?: number;
    trigger?: number;
    type?: 'circle' | 'brush';
    scrollProgress?: any; // Optional for backward compatibility with Somos
}

const HighlightMarker = ({ 
    children, 
    color, 
    delay = 0, 
    trigger = 0.25, 
    type = 'circle',
    scrollProgress 
}: HighlightMarkerProps) => {
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: trigger });
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        // Mode 1: Driven by scrollProgress (like in Somos)
        if (scrollProgress) {
            return scrollProgress.on("change", (latest: number) => {
                if (latest > trigger && !hasDrawn) {
                    draw();
                    setHasDrawn(true);
                } else if (latest < (trigger - 0.1) && hasDrawn) {
                    reset();
                    setHasDrawn(false);
                }
            });
        }
        
        // Mode 2: Triggered by entry into view (for standard pages)
        if (isInView && !hasDrawn) {
            draw();
            setHasDrawn(true);
        }
    }, [scrollProgress, isInView, hasDrawn, delay, trigger, type]);

    const draw = () => {
        if (pathRef.current) {
            const paths = containerRef.current?.querySelectorAll('path');
            paths?.forEach((p, i) => {
                gsap.fromTo(p, 
                    { strokeDashoffset: 1500 },
                    {
                        strokeDashoffset: 0,
                        duration: type === 'brush' ? 0.6 : 1.4,
                        delay: delay + (i * 0.15),
                        ease: type === 'brush' ? "power1.inOut" : "power2.inOut"
                    }
                );
            });
        }
    };

    const reset = () => {
        const paths = containerRef.current?.querySelectorAll('path');
        paths?.forEach(p => gsap.set(p, { strokeDashoffset: 1500 }));
    };

    const getPaths = () => {
        if (type === 'brush') {
            return ["M 1,25 L 199,25"];
        }
        // Two slightly different circle paths for a "sketched" look
        return [
            "M 195,25 C 195,45 150,55 100,55 C 50,55 5,45 5,25 C 5,5 50,2 100,2 C 150,2 192,5 192,23 C 192,35 170,48 100,48",
            "M 197,22 C 197,42 155,58 105,58 C 55,58 2,48 2,28 C 2,8 55,5 105,5 C 155,5 195,8 195,26 C 195,38 175,51 105,51"
        ];
    };

    return (
        <span ref={containerRef} className={`highlight-marker-container ${type}`}>
            <span className="marker-text">{children}</span>
            <svg className={`highlight-marker-svg ${type}`} viewBox={type === 'brush' ? "0 0 200 50" : "0 0 200 60"} preserveAspectRatio="none">
                {getPaths().map((d, i) => (
                    <path
                        key={i}
                        ref={i === 0 ? pathRef : null}
                        d={d}
                        stroke={color}
                        strokeWidth={type === 'brush' ? "24" : (i === 0 ? "2.5" : "1.8")}
                        fill="none"
                        strokeLinecap="round"
                        style={{ 
                            strokeDasharray: 1500, 
                            strokeDashoffset: 1500, 
                            opacity: type === 'brush' ? 0.35 : (i === 0 ? 0.8 : 0.4),
                        }}
                    />
                ))}
            </svg>
        </span>
    );
};

export default HighlightMarker;

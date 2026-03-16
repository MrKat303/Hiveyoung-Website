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
    type?: 'brush' | 'square';
}

/**
 * HighlightMarker - Used for the "brush/marker" highlight effect.
 * Commonly used in Advisory Board and Equipo pages.
 */
const HighlightMarker = ({ 
    children, 
    color, 
    delay = 0, 
    trigger = 0.25, 
    type = 'brush'
}: HighlightMarkerProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: trigger });
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        if (isInView && !hasDrawn) {
            draw();
            setHasDrawn(true);
        }
    }, [isInView, hasDrawn, delay]);

    const draw = () => {
        const paths = containerRef.current?.querySelectorAll('path');
        paths?.forEach((p, i) => {
            gsap.fromTo(p, 
                { strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 0.8,
                    delay: delay + (i * 0.1),
                    ease: "power2.inOut"
                }
            );
        });
    };

    return (
        <span ref={containerRef} className={`highlight-marker-container ${type}`}>
            <span className="marker-text">{children}</span>
            <svg className={`highlight-marker-svg ${type}`} viewBox="0 0 200 50" preserveAspectRatio="none">
                <path
                    d="M 0,25 L 200,25"
                    stroke={color}
                    strokeWidth="48"
                    fill="none"
                    strokeLinecap="butt"
                    style={{ 
                        strokeDasharray: 1000, 
                        strokeDashoffset: 1000, 
                        opacity: 0.3
                    }}
                />
            </svg>
        </span>
    );
};

export default HighlightMarker;

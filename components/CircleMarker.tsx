"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './CircleMarker.css';

interface CircleMarkerProps {
    children: React.ReactNode;
    color: string;
    delay?: number;
    trigger?: number;
    scrollProgress?: any;
}

const CircleMarker = ({ 
    children, 
    color, 
    delay = 0, 
    trigger = 0.6, 
    scrollProgress 
}: CircleMarkerProps) => {
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
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
    }, [scrollProgress, hasDrawn, delay, trigger]);

    const draw = () => {
        if (pathRef.current) {
            gsap.fromTo(pathRef.current, 
                { strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 1.8,
                    delay: delay,
                    ease: "power2.out"
                }
            );
        }
    };

    const reset = () => {
        if (pathRef.current) {
            gsap.set(pathRef.current, { strokeDashoffset: 1000 });
        }
    };

    return (
        <span ref={containerRef} className="circle-marker-container">
            <span className="circle-marker-text">{children}</span>
            <svg className="circle-marker-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path
                    ref={pathRef}
                    d="M 197,25 C 197,45 155,58 100,58 C 45,58 3,45 3,25 C 3,5 45,2 100,2 C 155,2 195,10 192,26"
                    stroke={color}
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{ 
                        strokeDasharray: 1000, 
                        strokeDashoffset: 1000, 
                    }}
                />
            </svg>
        </span>
    );
};

export default CircleMarker;

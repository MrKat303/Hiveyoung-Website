"use client";

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import './Login.css';

export default function LoginPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const targetDate = new Date('2026-03-09T00:00:00').getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".main-title", {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(".timer-unit", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.8")
            .fromTo(".button-container", {
                opacity: 0,
                scale: 0.8,
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");
    }, { scope: containerRef });

    return (
        <div className="countdown-container" ref={containerRef}>
            <div className="content-box">
                <h1 className="main-title">EL FUTURO DE LA COLABORACION...</h1>

                <div className="timer-grid">
                    {[
                        { value: timeLeft.days, label: 'DIAS' },
                        { value: timeLeft.hours, label: 'HORAS' },
                        { value: timeLeft.minutes, label: 'MINUTOS' },
                        { value: timeLeft.seconds, label: 'SEGUNDOS' }
                    ].map((unit, i) => (
                        <div key={i} className="timer-unit">
                            <span className="unit-value">{unit.value}</span>
                            <span className="unit-label">{unit.label}</span>
                        </div>
                    ))}
                </div>

                <div className="button-container">
                    <Link href="/" className="back-button back-button-link">
                        VOLVER A HIVEYOUNG
                    </Link>
                </div>
            </div>
        </div>
    );
}

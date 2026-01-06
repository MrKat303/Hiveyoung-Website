"use client";

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import './Login.css';

export default function LoginPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        // Apply lock to prevent scrolling on this page only
        document.documentElement.classList.add('login-body-lock');

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

        return () => {
            clearInterval(timer);
            // Clean up: restore scrolling when leaving the page
            document.documentElement.classList.remove('login-body-lock');
        };
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from(".hero-logo", {
            autoAlpha: 0,
            y: -50,
            scale: 1.2,
            filter: "blur(20px)",
            duration: 1,
        })
            .from(".hero-title", {
                autoAlpha: 0,
                y: 20,
                letterSpacing: "1.5em",
                filter: "blur(10px)",
                duration: 0.8,
            }, "-=0.7")
            .from(".countdown-unit", {
                autoAlpha: 0,
                scale: 0.5,
                y: 40,
                rotationX: -90,
                stagger: 0.08,
                duration: 0.8,
                filter: "blur(10px)",
            }, "-=0.6")
            .from(".hero-description", {
                autoAlpha: 0,
                y: 20,
                filter: "blur(5px)",
                duration: 0.6,
            }, "-=0.5")
            .from(".button-group .cta-button", {
                autoAlpha: 0,
                y: 30,
                scale: 0.9,
                stagger: 0.1,
                duration: 0.7,
                ease: "back.out(1.7)"
            }, "-=0.4");
    }, []);

    return (
        <div className="login-container">
            <Link href="/">
                <img src="/images/congreso/logos/tribuss.svg" alt="Tribuss" className="hero-logo" />
            </Link>

            <p className="hero-title">El futuro de la colaboración</p>

            <div className="countdown-main">
                {[
                    { value: timeLeft.days, label: 'Días' },
                    { value: timeLeft.hours, label: 'Horas' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Seg' }
                ].map((item, i) => (
                    <div key={i} className="countdown-unit">
                        <div className="countdown-value">{item.value}</div>
                        <div className="countdown-label">{item.label}</div>
                    </div>
                ))}
            </div>

            <p className="hero-description">
                Un nuevo espacio digital que conecta talento joven, ideas y colaboración.
            </p>

            <div className="button-group">
                <Link href="#" className="cta-button primary">
                    Lista de espera
                </Link>
                <Link href="/" className="cta-button secondary">
                    Volver
                </Link>
            </div>
        </div>
    );
}

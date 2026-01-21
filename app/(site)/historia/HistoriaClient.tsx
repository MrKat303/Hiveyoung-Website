"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Historia.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HistoriaClient() {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // 0. Ensure Title is Visible
            gsap.set('.hero-title-text', { opacity: 1 });

            // 1. Dynamic Background Logic
            const bgWrapper = document.querySelector('.historia-bg-wrapper') as HTMLElement;
            const sections = gsap.utils.toArray<HTMLElement>('.story-panel');

            sections.forEach((section) => {
                const color = section.getAttribute('data-color');
                const textColor = section.getAttribute('data-text-color');

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    onEnter: () => {
                        if (bgWrapper && color) gsap.to(bgWrapper, { backgroundColor: color, duration: 0.6 });
                        if (textColor) gsap.to('.historia-container', { color: textColor, duration: 0.6 });
                    },
                    onEnterBack: () => {
                        if (bgWrapper && color) gsap.to(bgWrapper, { backgroundColor: color, duration: 0.6 });
                        if (textColor) gsap.to('.historia-container', { color: textColor, duration: 0.6 });
                    }
                });
            });

            // 2. HERO: Scroll Interaction (Text Zoom)
            gsap.fromTo('.hero-title-text',
                { scale: 1, opacity: 1 },
                {
                    scale: 100, // Infinite zoom feel
                    opacity: 0,
                    ease: 'power1.in',
                    scrollTrigger: {
                        trigger: '.section-hero',
                        start: 'top top',
                        end: '+=100%', // Pin for 1 screen height
                        scrub: 0,
                        pin: true
                    }
                }
            );

            // 3. QUOTE: Text Reveal
            const words = gsap.utils.toArray<HTMLElement>('.word-span');
            gsap.fromTo(words,
                { opacity: 0.2 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.section-quote',
                        start: 'top 70%',
                        end: 'bottom 50%',
                        scrub: 1
                    }
                }
            );

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const quote = "Queremos agradecer a todas esas personas que hicieron posible este proyecto; a quienes siguen aquí y a quienes ya no. HiveYoung somos todos nosotros.";

    return (
        <div ref={mainRef} className="historia-container">
            <div className="historia-bg-wrapper"></div>

            {/* 1. HERO SECTION */}
            <section className="story-panel section-hero" data-color="#f4ede4" data-text-color="#3a1b4e">
                <div className="hero-content-center">
                    <h1 className="hero-title-text">
                        NUESTRA<br />HISTORIA
                    </h1>
                </div>
                <div className="scroll-hint">SCROLL</div>
            </section>

            {/* 2. QUOTE SECTION */}
            <section className="story-panel section-quote" data-color="#3a1b4e" data-text-color="#ffffff">
                <div className="quote-wrapper">
                    <p className="quote-paragraph">
                        {quote.split(" ").map((word, i) => (
                            <span key={i} className="word-span inline-block mr-3">{word}</span>
                        ))}
                    </p>
                </div>
            </section>

            {/* Spacer for scrolling past the end */}
            <div style={{ height: '50vh' }}></div>
        </div>
    );
}

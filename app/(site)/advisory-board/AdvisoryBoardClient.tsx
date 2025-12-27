"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./AdvisoryBoard.css";
import { advisors } from "@/data/advisory";

export default function AdvisoryBoardClient() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -50px 0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section className="advisory-section">
            <div className="advisory-container">
                <h2 className="advisory-title reveal">Advisory Board</h2>
                <p className="advisory-subtitle reveal">
                    Líderes estratégicos que impulsan nuestra visión.
                </p>

                <div className="advisory-grid">
                    {advisors.map((advisor, index) => (
                        <div
                            key={advisor.id}
                            className="advisory-card reveal"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className="advisory-image-container">
                                <Image src={advisor.img} alt={advisor.name} width={300} height={300} className="advisory-image" draggable={false} />
                            </div>
                            <div className={`advisory-content shadow-${advisor.color}`}>
                                <div className="advisory-header">
                                    <h3 className="advisory-name">{advisor.name}</h3>
                                    <a href="#" className="advisory-linkedin" aria-label={`LinkedIn de ${advisor.name}`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="linkedin-icon-svg"
                                        >
                                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="advisory-details">
                                    <span className="advisory-role">{advisor.role}</span>
                                    <span className="advisory-separator">|</span>
                                    <span className="advisory-institution">{advisor.institution}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

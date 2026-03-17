"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import TextType from './TextType';
import "./Hero.css";

export default function Hero() {
    const { scrollY } = useScroll();
    const [shouldRestart, setShouldRestart] = useState(true);

    const textOpacity = useTransform(scrollY, [0, 150], [1, 0]);
    const textY = useTransform(scrollY, [0, 150], [0, -40]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest === 0) {
            setShouldRestart(true);
        } else if (latest > 50) {
            setShouldRestart(false);
        }
    });

    return (
        <section className="hero" onContextMenu={(e) => e.preventDefault()}>
            <div className="hero__section">
                <div className="hero__container">

                    <div className="hero__left">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.5, 0, 0, 1], delay: 0.1 }}
                            style={{ opacity: textOpacity, y: textY }}
                            className="hero__title"
                        >
                            <span className="sr-only">Únete a la comunidad que crea el cambio.</span>
                            <span aria-hidden="true">
                                <TextType
                                    key={shouldRestart ? 'active' : 'inactive'}
                                    text="Únete a la<br/><span class='hero__accent'>comunidad</span> que<br/>crea el cambio."
                                    typingSpeed={90}
                                    showCursor={true}
                                    cursorCharacter="|"
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.5, 0, 0, 1], delay: 0.5 }}
                            style={{ opacity: textOpacity, y: textY }}
                            className="hero__subtitle"
                        >
                            Potencia tus habilidades, conécta, colabora con más jóvenes y lidera el
                            cambio en tu comunidad.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.5, 0, 0, 1], delay: 0.9 }}
                            style={{ opacity: textOpacity, y: textY }}
                            className="hero__cta"
                        >
                            <Link
                                className="hero__btn"
                                href="/unete"
                            >
                                Únete
                            </Link>

                            <a
                                className="hero__btn hero__btn--secondary"
                                href="https://app.hiveyoung.org"
                            >
                                Ingresar
                                <span className="hero__btn-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 17L15 12L10 7V17Z" fill="white" />
                                    </svg>
                                </span>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.5, 0, 0, 1], delay: 0.5 }}
                        style={{ opacity: textOpacity, y: textY }}
                        className="hero__right"
                    >
                        <Image
                            src="/images/home/hero.svg"
                            alt=""
                            width={600}
                            height={600}
                            className="hero__icons no-interaction"
                            draggable={false}
                            priority
                            aria-hidden="true"
                        />
                    </motion.div>

                </div>
            </div>

            <div className="hero__bottomOuter" aria-hidden="true">
                <div className="hero__bottomContainer">
                    <Image
                        src="/images/home/bottom.svg"
                        alt=""
                        width={1920}
                        height={200}
                        className="hero__bottom no-interaction"
                        draggable={false}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

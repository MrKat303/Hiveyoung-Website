"use client";

import { useState } from "react";
import Link from "next/link";
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
                            <TextType
                                key={shouldRestart ? 'active' : 'inactive'}
                                text="Únete a la<br/><span class='hero__accent'>comunidad</span> que<br/>crea el cambio."
                                typingSpeed={90}
                                showCursor={true}
                                cursorCharacter="|"
                            />
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
                                Unete
                            </Link>

                            <Link
                                className="hero__btn hero__btn--secondary"
                                href="/somos"
                            >
                                Sobre Nosotros
                                <span className="hero__btn-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 17L15 12L10 7V17Z" fill="white" />
                                    </svg>
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.5, 0, 0, 1], delay: 0.5 }}
                        style={{ opacity: textOpacity, y: textY }}
                        className="hero__right"
                    >
                        <img
                            className="hero__icons no-interaction"
                            src="/hero.svg"
                            alt="Ecosistema juvenil HiveYoung - Conectando líderes del cambio"
                            draggable="false"
                        />
                    </motion.div>

                </div>
            </div>

            <div className="hero__bottomOuter" aria-hidden="true">
                <div className="hero__bottomContainer">
                    <img
                        className="hero__bottom no-interaction"
                        src="/bottom.svg"
                        alt=""
                        draggable="false"
                    />
                </div>
            </div>
        </section>
    );
}

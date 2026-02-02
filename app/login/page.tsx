"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import './Login.css';

const LoginPage = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('March 9, 2026 00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -2, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.2,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6
            }
        }
    };

    const sectionVariants: Variants = {
        hiddenLeft: { opacity: 0, x: -100, skewX: -10 },
        hiddenRight: { opacity: 0, x: 100, skewX: 10 },
        visible: {
            opacity: 1,
            x: 0,
            skewX: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
            }
        }
    };

    const shutterVariants: Variants = {
        initial: { scale: 1 },
        animate: (i: number) => ({
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.85, 0, 0.15, 1],
                delay: 0.2 + (i * 0.05)
            }
        })
    };

    return (
        <div className="login-container">
            {/* Disruptive Intro Elements */}
            <motion.div
                className="intro-flash"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            <div className="shutter-overlay">
                <motion.div className="shutter-panel top-left" variants={shutterVariants} custom={0} initial="initial" animate="animate" />
                <motion.div className="shutter-panel top-right" variants={shutterVariants} custom={1} initial="initial" animate="animate" />
                <motion.div className="shutter-panel bottom-left" variants={shutterVariants} custom={2} initial="initial" animate="animate" />
                <motion.div className="shutter-panel bottom-right" variants={shutterVariants} custom={3} initial="initial" animate="animate" />
            </div>

            <motion.div
                className="login-split-layout"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Side: Login Form */}
                <motion.div
                    className="login-section"
                    variants={sectionVariants}
                    initial="hiddenLeft"
                    animate="visible"
                >
                    <div className="login-header">
                        <motion.h1 variants={itemVariants} className="login-main-title">
                            Iniciar Sesión
                        </motion.h1>
                        <motion.p variants={itemVariants} className="login-subtitle">
                            Acceso Privado
                        </motion.p>
                    </div>

                    <form className="login-form-content" onSubmit={(e) => e.preventDefault()}>
                        <motion.div variants={itemVariants} className="form-group">
                            <label>Usuario</label>
                            <input type="text" placeholder="Ingresa tu usuario" required />
                        </motion.div>
                        <motion.div variants={itemVariants} className="form-group">
                            <label>Contraseña</label>
                            <input type="password" placeholder="••••••••" required />
                        </motion.div>
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="login-submit-btn"
                        >
                            Entrar
                        </motion.button>
                    </form>
                </motion.div>

                {/* Right Side: Countdown */}
                <motion.div
                    className="countdown-section"
                    variants={sectionVariants}
                    initial="hiddenRight"
                    animate="visible"
                >
                    <div className="countdown-overlay">
                        <motion.div
                            variants={itemVariants}
                            className="coming-soon-badge-dark"
                        >
                            PRÓXIMAMENTE 2026
                        </motion.div>

                        <motion.h2 variants={itemVariants}>
                            Lanzamiento Oficial
                        </motion.h2>

                        <div className="countdown-grid-horizontal">
                            {[
                                { label: 'Días', value: timeLeft.days },
                                { label: 'Horas', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Seg', value: timeLeft.seconds }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    variants={itemVariants}
                                    className="countdown-box"
                                >
                                    <span className="number">{item.value}</span>
                                    <span className="label">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            variants={itemVariants}
                            className="countdown-info"
                        >
                            9 DE MARZO
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

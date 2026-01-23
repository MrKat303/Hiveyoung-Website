"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

    return (
        <div className="login-container">
            <div className="login-split-layout">
                {/* Left Side: Login Form */}
                <div className="login-section">
                    <div className="login-header">
                        <h1 className="login-main-title">Iniciar Sesión</h1>
                        <p className="login-subtitle">Acceso Privado</p>
                    </div>

                    <form className="login-form-content" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" placeholder="Ingresa tu usuario" required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" placeholder="••••••••" required />
                        </div>
                        <button type="submit" className="login-submit-btn">
                            Entrar
                        </button>
                    </form>
                </div>

                {/* Right Side: Countdown */}
                <div className="countdown-section">
                    <div className="countdown-overlay">
                        <div className="coming-soon-badge-dark">PRÓXIMAMENTE 2026</div>
                        <h2>Lanzamiento Oficial</h2>

                        <div className="countdown-grid-horizontal">
                            <div className="countdown-box">
                                <span className="number">{timeLeft.days}</span>
                                <span className="label">Días</span>
                            </div>
                            <div className="countdown-box">
                                <span className="number">{timeLeft.hours}</span>
                                <span className="label">Horas</span>
                            </div>
                            <div className="countdown-box">
                                <span className="number">{timeLeft.minutes}</span>
                                <span className="label">Min</span>
                            </div>
                            <div className="countdown-box">
                                <span className="number">{timeLeft.seconds}</span>
                                <span className="label">Seg</span>
                            </div>
                        </div>

                        <p className="countdown-info">9 DE MARZO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

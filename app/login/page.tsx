"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import './Login.css';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
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

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Logic to allow Email or ID
        let finalEmail = email.trim();
        
        if (!finalEmail.includes('@')) {
            // It's an ID, try to find the associated email
            const { data, error: rpcError } = await supabase.rpc('get_email_by_id', { 
                id_search: finalEmail 
            });
            
            if (rpcError || !data || data.length === 0) {
                setError('No se encontró un usuario con ese ID');
                setLoading(false);
                return;
            }
            finalEmail = data[0].email;
        }

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({ 
                email: finalEmail, 
                password 
            });
            if (authError) throw authError;
            router.push('/profile');
        } catch (err: any) {
            setError(err.message === 'Invalid login credentials' 
                ? 'Usuario o contraseña incorrectos' 
                : err.message || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
    };

    return (
        <div className="login-container">
            <motion.div
                className="login-split-layout"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Side: Login Form */}
                <motion.div className="login-section" variants={sectionVariants}>
                    <div className="login-header">
                        <motion.h1 variants={itemVariants} className="login-main-title">
                            Iniciar Sesión
                        </motion.h1>
                        <motion.p variants={itemVariants} className="login-subtitle">
                            Acceso Privado
                        </motion.p>
                    </div>

                    <form className="login-form-content" onSubmit={handleAuth}>
                        <motion.div variants={itemVariants} className="form-group">
                            <label>Email o ID</label>
                            <input 
                                type="text" 
                                placeholder="tu@email.com o ID" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="form-group">
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </motion.div>
                        
                        {error && <p className="auth-error">{error}</p>}

                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="login-submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Entrar'}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Right Side: Countdown */}
                <motion.div className="countdown-section" variants={sectionVariants}>
                    <div className="countdown-overlay">
                        <motion.h2 variants={itemVariants}>
                            Lanzamiento Oficial
                        </motion.h2>

                        <div className="countdown-grid-horizontal">
                            {[
                                { label: 'Días', value: timeLeft.days },
                                { label: 'Hr', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Seg', value: timeLeft.seconds }
                            ].map((item) => (
                                <motion.div key={item.label} variants={itemVariants} className="countdown-box">
                                    <span className="number">{item.value}</span>
                                    <span className="label">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;


"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Accordion from '@/components/ui/Accordion';
import { useEmailForm } from '@/hooks/useEmailForm';
import { isValidEmail, isValidPhone } from '@/utils/validation';
import './Unete.css';

const localFaqs = [
    {
        question: "¿Quiénes pueden unirse a HiveYoung?",
        answer: "Jóvenes estudiantes de enseñanza media, egresados o universitarios interesados en participar activamente en la organización."
    },
    {
        question: "¿Existe un límite de edad para unirse a HiveYoung?",
        answer: "No. Ideal jóvenes entre 14 y 29 años."
    },
    {
        question: "¿Tiene algún costo unirse?",
        answer: "No. La participación es completamente gratuita."
    },
    {
        question: "¿De qué formas puedo participar en HiveYoung?",
        answer: "Integrando equipos de trabajo, participando como voluntario/a en actividades, colaborando en proyectos y asistiendo a instancias formativas."
    },
    {
        question: "¿Debo tener experiencia o alguna habilidad específica para participar?",
        answer: "No. Solo se requieren ganas de aprender, participar y aportar."
    },
    {
        question: "¿Qué obtengo al unirme a HiveYoung?",
        answer: "Experiencia en proyectos reales, desarrollo de habilidades personales y profesionales, formación y formar parte de una comunidad."
    },
    {
        question: "¿Cuánto tiempo debo dedicar?",
        answer: "La dedicación es flexible y depende de tu disponibilidad."
    },
    {
        question: "¿Puedo participar desde cualquier ciudad?",
        answer: "Sí. Hay actividades presenciales y virtuales."
    }
];

const UneteClient = () => {
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const { formRef: form, isSending, status, sendEmail } = useEmailForm("template_4jqpfum", {
        validate: () => !emailError && !phoneError
    });

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -100px 0px",
            threshold: 0.2,
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

    const validarEmail = (valor: string) => {
        setEmailError(valor !== "" && !isValidEmail(valor));
    };

    const validarTelefono = (valor: string) => {
        setPhoneError(valor !== "" && !isValidPhone(valor));
    };

    return (
        <div className="unete-page">
            <div className="unete-container">
                <section className="unete-hero reveal">
                    <h1 className="unete-title">¡Únete a HiveYoung!</h1>
                </section>

                <div className="unete-content-grid">
                    <div className="unete-faq-wrapper reveal">
                        <h2 className="faq-title">Preguntas Frecuentes</h2>
                        <Accordion items={localFaqs} />
                    </div>

                    <div className="unete-form-wrapper reveal">
                        <form ref={form} className="unete-form" onSubmit={sendEmail}>
                            <div className="form-group">
                                <FormField
                                    label="NOMBRE COMPLETO"
                                    name="user_name"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <FormField
                                    label="EMAIL"
                                    name="user_email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    className={emailError ? 'input-error' : ''}
                                    onChange={(e) => validarEmail(e.target.value)}
                                    error={emailError ? "Ingresa un email válido" : null}
                                    required
                                />
                                <FormField
                                    label="NÚMERO"
                                    name="user_phone"
                                    type="tel"
                                    placeholder="+56 9 ..."
                                    className={phoneError ? 'input-error' : ''}
                                    onChange={(e) => validarTelefono(e.target.value)}
                                    error={phoneError ? "Solo números y signo +" : null}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <FormField
                                    label="CIUDAD O REGIÓN"
                                    name="user_city"
                                    placeholder="Ej: Santiago, Región Metropolitana"
                                    required
                                />
                                <FormField
                                    label="INSTITUCIÓN"
                                    name="user_institution"
                                    placeholder="Colegio o Universidad"
                                    required
                                />
                            </div>

                            <FormField
                                label="CURSO O CARRERA"
                                name="user_career"
                                placeholder="Ej: 4to Medio / Ingeniería"
                                required
                            />

                            <FormField
                                label="¿QUÉ COSAS TE GUSTAN O TE INTERESAN?"
                                name="user_interests"
                                placeholder="Cuéntanos sobre tus intereses..."
                                required
                            />

                            <FormField
                                label="MOTIVACIÓN"
                                name="user_motivation"
                                placeholder="¿Por qué quieres ser parte de HiveYoung?"
                                textarea
                                rows="3"
                                required
                            />

                            <Button
                                type="submit"
                                className="unete-submit-btn"
                                isLoading={isSending}
                                icon={<ArrowRight size={20} strokeWidth={3} />}
                            >
                                Enviar
                            </Button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="status-msg success"
                                    >
                                        ¡Mensaje enviado con éxito! Nos contactaremos pronto.
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="status-msg error"
                                    >
                                        Hubo un error al enviar. Por favor intenta de nuevo.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UneteClient;

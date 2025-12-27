"use client";

import React, { useState } from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { useEmailForm } from '@/hooks/useEmailForm';
import { isValidEmail } from '@/utils/validation';
import './Contacto.css';

const ContactoClient = () => {
    const [tipo, setTipo] = useState('colaborar');
    const [emailError, setEmailError] = useState(false);

    // Usamos el template específico para contacto
    const { formRef: form, isSending, status, sendEmail } = useEmailForm("template_m890v2b", {
        validate: () => !emailError
    });

    useScrollReveal();

    const validarEmail = (valor: string) => {
        setEmailError(valor !== "" && !isValidEmail(valor));
    };

    return (
        <div className="contact-page">
            <div className="contact-container">

                {/* LADO IZQUIERDO */}
                <div className="contact-sidebar reveal">
                    <h1 className="contact-title">
                        Conectemos<span className="title-square"></span>
                    </h1>
                    <p className="contact-description">
                        ¿Tienes una idea o quieres ser parte del equipo? Estamos listos para escucharte.
                    </p>

                    <div className="contact-info-list">
                        <div className="info-item-wrapper">
                            <div className="info-icon-box"><Mail size={20} /></div>
                            <p>Hiveyoung@gmail.com</p>
                        </div>
                        <div className="info-item-wrapper">
                            <div className="info-icon-box"><Phone size={20} /></div>
                            <p>+56 9 8392 4500</p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO */}
                <div className="contact-form-section reveal">
                    <div className="type-selector">
                        {['colaborar', 'otro'].map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={`selector-btn ${tipo === item ? 'active' : ''}`}
                                onClick={() => setTipo(item)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>

                    <form ref={form} className="main-form" onSubmit={sendEmail}>
                        <input type="hidden" name="contact_type" value={tipo} />

                        <div className="form-row">
                            <FormField
                                label="NOMBRE"
                                name="user_name"
                                placeholder="Tu nombre"
                                required
                            />

                            <FormField
                                label="EMAIL"
                                name="user_email"
                                type="email"
                                placeholder="tu@email.com"
                                className={emailError ? 'input-error' : ''}
                                onChange={(e) => validarEmail(e.target.value)}
                                error={emailError ? "Usa un dominio válido (ej: .com, .cl, .org)" : null}
                                required
                            />
                        </div>

                        {/* FORMULARIO: COLABORAR */}
                        {tipo === 'colaborar' && (
                            <>
                                <FormField
                                    label="EMPRESA O INSTITUCIÓN"
                                    name="user_institution"
                                    placeholder="Nombre legal o comercial"
                                    required
                                />
                                <div className="form-group">
                                    <label>TIPO DE COLABORACIÓN</label>
                                    <select name="collab_type" className="form-select" required>
                                        <option value="">Selecciona una opción</option>
                                        <option value="colaboracion">Colaboración técnica</option>
                                        <option value="sponsor">Sponsor/apoyo financiero</option>
                                        <option value="alianza">Alianzas estratégicas</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <FormField
                                    label="MENSAJE"
                                    name="message"
                                    placeholder="Cuéntanos más..."
                                    textarea
                                    rows="3"
                                    required
                                />
                            </>
                        )}

                        {/* FORMULARIO: OTRO */}
                        {tipo === 'otro' && (
                            <>
                                <FormField
                                    label="ASUNTO"
                                    name="subject"
                                    placeholder="¿Sobre qué quieres hablar?"
                                    required
                                />

                                <FormField
                                    label="MENSAJE"
                                    name="message"
                                    placeholder="Detalles..."
                                    textarea
                                    rows="4"
                                    required
                                />
                            </>
                        )}

                        <Button
                            type="submit"
                            className="submit-btn"
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
                                    style={{ color: '#5cd494', marginTop: '15px', fontWeight: '600' }}
                                >
                                    ¡Mensaje enviado con éxito!
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="status-msg error"
                                    style={{ color: '#ff4d4d', marginTop: '15px', fontWeight: '600' }}
                                >
                                    Error al enviar. Intenta de nuevo.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactoClient;

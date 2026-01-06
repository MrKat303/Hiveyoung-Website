"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabase } from '@/utils/supabase';
import { CheckCircle2, X } from 'lucide-react';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(contentRef.current, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.2)",
                delay: 0.1
            });
        } else {
            gsap.to(contentRef.current, {
                scale: 0.95,
                y: 10,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.in",
                delay: 0.05
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get('nombre'),
            edad: parseInt(formData.get('edad') as string),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            institucion: formData.get('institucion'),
            region: formData.get('region'),
            ciudad: formData.get('ciudad'),
            comuna: formData.get('comuna'),
        };

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([data]);

            if (error) throw error;

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 3000);
        } catch (error) {
            console.error('Error saving to Supabase:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen && typeof window !== 'undefined' && overlayRef.current?.style.visibility === 'hidden') return null;

    return (
        <div
            className="modal-overlay"
            ref={overlayRef}
            onClick={(e) => e.target === overlayRef.current && onClose()}
        >
            <div className="modal-content" ref={contentRef}>
                <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                    <X size={16} />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">Lista de Espera</h2>
                    <p style={{
                        fontSize: '0.85rem',
                        color: '#0A1A10',
                        opacity: 0.7,
                        marginTop: '0rem',
                        marginBottom: '1.2rem',
                        textAlign: 'center',
                        fontWeight: 500,
                        lineHeight: '1.4'
                    }}>
                        Sé el primero en conocer <strong>Tribuss</strong>, la primera plataforma enfocada en la colaboración.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="success-message" style={{ color: '#0A1A10', padding: '3rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ color: '#0A1A10', marginBottom: '1rem' }}>
                            <CheckCircle2 size={56} strokeWidth={1.5} />
                        </div>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>¡Registro Exitoso!</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7, fontWeight: 500, maxWidth: '300px' }}>
                            Te hemos añadido a la lista. Muy pronto recibirás noticias nuestras.
                        </p>
                    </div>
                ) : (
                    <form className="waitlist-form" onSubmit={handleSubmit}>
                        <div className="form-row form-row-name-age">
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input name="nombre" type="text" placeholder="Tu nombre" required />
                            </div>
                            <div className="form-group">
                                <label>Edad</label>
                                <input name="edad" type="number" placeholder="20" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input name="email" type="email" placeholder="hola@ejemplo.com" required />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input name="telefono" type="tel" placeholder="+569..." required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Institución</label>
                                <input name="institucion" type="text" placeholder="Universidad / Empresa" required />
                            </div>
                            <div className="form-group">
                                <label>Región</label>
                                <input name="region" type="text" placeholder="Metropolitana" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Ciudad</label>
                                <input name="ciudad" type="text" placeholder="Santiago" required />
                            </div>
                            <div className="form-group">
                                <label>Comuna</label>
                                <input name="comuna" type="text" placeholder="Tu comuna" required />
                            </div>
                        </div>

                        {status === 'error' && (
                            <p style={{ color: '#d00000', fontSize: '0.7rem', textAlign: 'center', marginTop: '0.2rem', fontWeight: 600 }}>
                                Error inesperado. Reintenta.
                            </p>
                        )}

                        <button type="submit" className="submit-button">
                            {isSubmitting ? 'Procesando...' : 'Unirse ahora'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

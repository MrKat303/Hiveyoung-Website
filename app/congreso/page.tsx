"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Menu,
    X,
    LayoutDashboard,
    Camera,
    Mic2,
    Calendar,
    Star,
    Instagram,
    Linkedin
} from 'lucide-react';
import './Congreso.css';

// Componentes extraídos
import { HeroCarousel } from './components/HeroCarousel';
import { StatsSection } from './components/StatsSection';
import { VenueSection } from './components/VenueSection';
import { FAQSection } from './components/FAQSection';
import { SpeakersGrid } from './components/SpeakersGrid';
import { MomentosGallery } from './components/MomentosGallery';

// Datos
import { speakers as speakersData, rooms } from '@/data/speakers';
import { HERO_IMAGES, AVAILABLE_CATEGORIES, CONGRESS_FEATURES } from '@/data/congreso';

type Section = 'resumen' | 'agenda' | 'speakers' | 'momentos';
type Day = 'Día 1' | 'Día 2';

const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: <LayoutDashboard size={18} /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
    { id: 'speakers', label: 'Speakers', icon: <Mic2 size={18} /> },
    { id: 'momentos', label: 'Momentos', icon: <Camera size={18} /> },
];

export default function CongresoPage() {
    const [activeSection, setActiveSection] = useState<Section>('resumen');
    const [activeDay, setActiveDay] = useState<Day>('Día 1');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSectionChange = (id: Section) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    return (
        <div className="congreso-page">
            <div className="mesh-gradient-bg">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="glow-orb orb-3"></div>
                <div className="noise-overlay"></div>
            </div>

            <HeroCarousel images={HERO_IMAGES} />

            <div className="mini-navbar-wrapper">
                <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <nav className={`mini-navbar ${isMenuOpen ? 'mobile-open' : ''}`}>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`mini-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => handleSectionChange(item.id as Section)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <main className="congreso-main">
                <AnimatePresence mode="wait">
                    {/* RESUMEN */}
                    {activeSection === 'resumen' && (
                        <motion.div
                            key="resumen"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="resumen-grid"
                        >
                            <div className="highlights-hero-card">
                                <div className="edition-badge">EDICIÓN 2025 • 7 Y 8 DE JULIO</div>
                                <h2>El evento juvenil más <br className="br-desktop" />importante de Chile</h2>
                                <p className="highlight-subtitle">(Hecho por y para jóvenes)</p>
                            </div>

                            <StatsSection />

                            <section className="highlights-section-new">
                                <div className="highlights-intro-full">
                                    <div className="divider-mini"></div>
                                    <h3>El epicentro de una <br className="br-desktop" />generación sin barreras</h3>
                                    <p>El espacio donde líderes del emprendimiento, empresarial e innovación se unieron para activar a una generación sin límites.</p>
                                </div>

                                <div className="highlights-bottom-grid">
                                    {CONGRESS_FEATURES.map((f, i) => (
                                        <div key={i} className="feature-item">
                                            <CheckCircle2 color="#ff8ab1" />
                                            <span style={{ fontWeight: 600 }}>{f}</span>
                                        </div>
                                    ))}

                                    <div className="highlight-visual">
                                        <div style={{ padding: '60px 40px', background: 'var(--glass-bg)', borderRadius: '40px', border: '1px solid var(--glass-border)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <Star size={64} opacity={0.2} style={{ marginBottom: '24px' }} />
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Próxima Edición</h3>
                                            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>CEINA – OCTUBRE 2026</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <VenueSection />
                            <FAQSection />
                        </motion.div>
                    )}

                    {/* AGENDA */}
                    {activeSection === 'agenda' && (
                        <motion.div
                            key="agenda"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="agenda-controls">
                                {(['Día 1', 'Día 2'] as Day[]).map(day => (
                                    <button
                                        key={day}
                                        className={`day-btn ${activeDay === day ? 'active' : ''}`}
                                        onClick={() => setActiveDay(day)}
                                    >
                                        {day.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="rooms-grid">
                                {rooms.map((room) => (
                                    <div key={room} className="room-col">
                                        <h3>{room}</h3>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="agenda-card">
                                                <span className="a-timestamp">{9 + i}:00 AM</span>
                                                <h4 className="a-title">Texto 1</h4>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* SPEAKERS */}
                    {activeSection === 'speakers' && (
                        <SpeakersGrid
                            speakers={speakersData}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            availableCategories={AVAILABLE_CATEGORIES}
                        />
                    )}

                    {/* MOMENTOS */}
                    {activeSection === 'momentos' && <MomentosGallery />}
                </AnimatePresence>
            </main >

            <footer className="congreso-footer">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <Image src="/Logo.svg" alt="HiveYoung Logo" width={130} height={65} style={{ height: '65px', width: 'auto' }} />
                        </div>
                        <nav className="footer-nav">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    className="footer-link"
                                    onClick={() => handleSectionChange(item.id as Section)}
                                    style={{ background: 'none', border: 'none' }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                        <div className="footer-socials">
                            <a href="https://instagram.com/hiveyoung" target="_blank" rel="noopener noreferrer" className="social-btn">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/hiveyoung" target="_blank" rel="noopener noreferrer" className="social-btn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 HiveYoung. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}

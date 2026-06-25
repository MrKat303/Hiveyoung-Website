"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
// Modular CSS imports
import './styles/variables.css';
import './styles/base.css';
import './styles/hero.css';
import './styles/navbar.css';
import './styles/main.css';
import './styles/section.css';
import './styles/stats.css';
import './styles/agenda.css';
import './styles/speakers.css';
import './styles/momentos.css';
import './styles/venue.css';
import './styles/faq.css';
import './styles/footer.css';
import './styles/responsive.css';

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

export default function Congreso2025Client() {
    const [activeSection, setActiveSection] = useState<Section>('resumen');
    const [activeDay, setActiveDay] = useState<Day>('Día 1');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');

    const handleSectionChange = (id: Section) => {
        setActiveSection(id);
    };

    return (
        <div className="congreso-page">
            <div className="mesh-gradient-bg">
                {/* mesh background removed via CSS but div remains */}
            </div>

            {/* Simple Header */}
            <header className="edicion-header">
                <div className="header-center">
                    <Link href="/congreso">
                        <Image
                            src="/images/congreso/logo-congreso.svg"
                            alt="Congreso HiveYoung Logo"
                            width={220}
                            height={60}
                            priority
                            style={{ height: '60px', width: 'auto' }}
                        />
                    </Link>
                </div>
            </header>


            <div className="congreso-hero">
                <HeroCarousel images={HERO_IMAGES} />
                
                <div className="hero-vertical-year">
                    <div className="hero-vertical-year-inner">
                        <span>20</span>
                        <span>25</span>
                    </div>
                </div>

                <div className="hero-content-wrapper">
                    <h1 className="hero-title">
                        Congreso<br />
                        <span>HiveYoung</span>
                    </h1>
                    <span className="hero-edition-subtitle">Una Generación sin Barreras</span>
                    <div className="hero-actions">
                        <button className="hero-cta-btn" onClick={() => {
                            handleSectionChange('resumen' as any);
                            document.querySelector('.congreso-main')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Explorar edición
                        </button>
                        <button className="hero-cta-outline" onClick={() => {
                            handleSectionChange('speakers' as any);
                            document.querySelector('.congreso-main')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Ver speakers
                        </button>
                    </div>
                </div>
            </div>

            <div className="mini-navbar-wrapper">
                <nav className={`mini-navbar`}>
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
                                            <CheckCircle2 color="#c4a0ff" />
                                            <span style={{ fontWeight: 600 }}>{f}</span>
                                        </div>
                                    ))}

                                    <div className="highlight-visual tematicas-container">
                                        <div style={{ padding: '40px 30px', background: 'rgba(143,90,255,0.06)', borderRadius: '40px', border: '1px solid rgba(160,110,255,0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'Gango, system-ui, sans-serif', textAlign: 'center' }}>Temáticas</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                                                {['Emprendimiento', 'Innovación', 'Finanzas', 'Arte', 'Marketing', 'Tecnología'].map((tema, idx) => (
                                                    <span key={idx} style={{ 
                                                        padding: '8px 16px', 
                                                        background: 'rgba(143,90,255,0.15)', 
                                                        borderRadius: '100px', 
                                                        fontSize: '0.9rem', 
                                                        fontWeight: 600,
                                                        color: 'var(--brand-purple-light)'
                                                    }}>
                                                        {tema}
                                                    </span>
                                                ))}
                                            </div>
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
                                                <h4 className="a-title">Sesión Informativa</h4>
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
                </AnimatePresence>
                
                <div style={{ display: activeSection === 'momentos' ? 'block' : 'none' }}>
                    <MomentosGallery />
                </div>
            </main >

            <footer className="congreso-footer">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <a href="https://hiveyoung.org">
                                <Image src="/images/congreso/logo-congreso.svg" alt="Congreso HiveYoung Logo" width={220} height={60} style={{ height: '60px', width: 'auto' }} />
                            </a>
                            <p className="footer-description">
                                Creado por jóvenes, impulsado por ideas y construido para el futuro.
                            </p>
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
                            <a href="https://instagram.com/hiveyoung.cl" target="_blank" rel="noopener noreferrer" className="social-btn">
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

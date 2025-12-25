"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    CheckCircle2,
    Search,
    Menu,
    X,
    LayoutDashboard,
    Camera,
    Mic2,
    Calendar,
    Users,
    Building2,
    Star,
    HelpCircle,
    MapPin,
    ChevronDown,
    Instagram,
    Linkedin,
    Youtube
} from 'lucide-react';
import './Congreso.css';

type Section = 'resumen' | 'agenda' | 'speakers' | 'momentos';
type Day = 'Día 1' | 'Día 2';

const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: <LayoutDashboard size={18} /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
    { id: 'speakers', label: 'Speakers', icon: <Mic2 size={18} /> },
    { id: 'momentos', label: 'Momentos', icon: <Camera size={18} /> },
];

const rooms = ["Aula Magna", "Sala Cámara", "Sala Multimedia 1"];

// Speaker Mock Data
const speakersData = [
    {
        id: 1,
        name: "Alejandra Mustakis",
        company: "IF / MEDULAR / KAUEL",
        role: "Emprendedora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676082/WhatsApp_Image_2025-12-25_at_12.20.36_keobdu.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 2,
        name: "Rosario Navarro",
        company: "SOFOFA",
        role: "Presidenta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676076/F7HOUZ7NLZFCTCVOQCPIWRTRAA_b6enfq.jpg",
        tags: ["Emprendimiento", "Innovación"],
        category: "Emprendimiento"
    },
    {
        id: 3,
        name: "Gina Ocqueteau",
        company: "SQM",
        role: "Presidenta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676092/Gina-Ocqueteau-Tacchini.jpeg_vve4du.jpg",
        tags: ["Liderazgo", "Innovación"],
        category: "Liderazgo"
    },
    {
        id: 4,
        name: "Marcelo Guital",
        company: "GUITAL & PARTNERS",
        role: "Fundador y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766675905/KPW2LQRDUBBABFHBLOIE3BINNQ_rwyw9i.avif",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 5,
        name: "Pablo Riccheri",
        company: "CAMBRIDGE BUSSINESS ASSOCIATION",
        role: "Global Managing Partner",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676163/Pablo_tsjrcz.jpg",
        tags: ["Liderazgo", "Emprendimiento"],
        category: "Liderazgo"
    },
    {
        id: 6,
        name: "Francisco Ackermann",
        company: "ACKERMANN PROPIEDADES",
        role: "Educador Financiero",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676191/imagen_principal-50282_gmeew5.jpg",
        tags: ["Finanzas", "Educación"],
        category: "Finanzas"
    },
    {
        id: 7,
        name: "Anil Sadarangani",
        company: "UNIVERSIDAD DE LOS ANDES",
        role: "Director de Innovación",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676200/2021_t8spud.webp",
        tags: ["Innovación", "Educación"],
        category: "Innovación"
    },
    {
        id: 8,
        name: "Fernanda Vicente",
        company: "MONEY QUEEN",
        role: "Cofundadora y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678670/Copia_de_Fernanda_Vicente_wivawt.jpg",
        tags: ["Innovación", "Emprendimiento"],
        category: "Innovación"
    },
    {
        id: 9,
        name: "Catherine Ruz",
        company: "GREY CAPITAL",
        role: "Socia Fundadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676169/caty_hf0ot0.jpg",
        tags: ["Emprendimiento", "Finanzas"],
        category: "Emprendimiento"
    },
    {
        id: 10,
        name: "Lorena Gallardo",
        company: "FUNDADORAS",
        role: "Fundadora y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678661/DSC_5647_gvdtdx.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 11,
        name: "Ximena Rincón",
        company: "SENADO DE CHILE",
        role: "Senadora de la República",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676320/Ximena-Rincon-2_pwftl4.webp",
        tags: ["Liderazgo", "Educación"],
        category: "Liderazgo"
    },
    {
        id: 12,
        name: "Anne Traub",
        company: "FUNDACIÓN FAMILIAS PRIMERO",
        role: "Fundadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678937/21112024-IMG_1583_g4icde.webp",
        tags: ["Liderazgo", "Educación"],
        category: "Liderazgo"
    },
    {
        id: 13,
        name: "Fernando Venegas",
        company: "ZENIT CHILE",
        role: "Fundador y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676343/artworks-T5BFUqFDK9qOzjvk-Hz3Fvg-t500x500_hd5eaa.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 14,
        name: "Natalia Lidijover",
        company: "OTIC SOFOFA",
        role: "Gerente General",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678940/1744395504810_tcm4xj.jpg",
        tags: ["Innovación", "Capital Humano"],
        category: "Innovación"
    }
];

const availableCategories = ["Todos", "Liderazgo", "Emprendimiento", "Innovación", "Finanzas"];

const CountUp = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const [count, setCount] = React.useState(0);
    const nodeRef = React.useRef(null);
    const isInView = useInView(nodeRef, { once: true });

    React.useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalFrames = duration * 60;
            const frameDuration = 1000 / 60;

            const counter = setInterval(() => {
                start += end / totalFrames;
                if (start >= end) {
                    setCount(end);
                    clearInterval(counter);
                } else {
                    setCount(Math.floor(start));
                }
            }, frameDuration);
            return () => clearInterval(counter);
        }
    }, [isInView, value, duration]);

    return <span ref={nodeRef} className="count-up-val">{count.toLocaleString()}</span>;
};

const heroImages = [
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766510857/Orquesta_1_yzgvao.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512697/Participacion_udtvn3.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766536297/Publico_h2gils.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681084/IMG_1919-Mejorado-NR_kerahb.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681079/IMG_2062-Mejorado-NR_shgago.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681260/IMG_1780_rrrrjc.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512618/Panel_zz5lbb.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681335/IMG_2039-Mejorado-NR_too0bk.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766673940/IMG_1953_mhnxkh.jpg"
];

export default function CongresoPage() {
    const [activeSection, setActiveSection] = useState<Section>('resumen');
    const [activeDay, setActiveDay] = useState<Day>('Día 1');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [currSlide, setCurrSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSectionChange = (id: Section) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    const filteredSpeakers = useMemo(() => {
        return speakersData.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.company.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Todos' || s.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="congreso-page">
            <div className="mesh-gradient-bg">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="glow-orb orb-3"></div>
                <div className="noise-overlay"></div>
            </div>

            {/* HERO CAROUSEL */}
            <header className="congreso-hero">
                <div className="hero-carousel">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currSlide}
                            className="hero-slide"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            style={{ backgroundImage: `url(${heroImages[currSlide]})` }}
                        />
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ zIndex: 2 }}
                >
                    <h1 className="hero-title">
                        Congreso <br />
                        <span>HiveYoung</span>
                    </h1>
                    <p className="hero-tagline">UNA GENERACIÓN SIN BARRERAS</p>
                </motion.div>
            </header>

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
                            <div className="stats-container">
                                {[
                                    { val: 2100, label: 'Asistentes', icon: <Users />, prefix: '+' },
                                    { val: 35, label: 'Speakers', icon: <Mic2 />, prefix: '+' },
                                    { val: 40, label: 'Instituciones', icon: <Building2 />, prefix: '+' }
                                ].map((s, i) => (
                                    <div key={i} className="stat-card">
                                        <div className="stat-icon">{s.icon}</div>
                                        <div className="stat-val">
                                            {s.prefix}<CountUp value={s.val} />
                                        </div>
                                        <div className="stat-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <section className="highlights-section">
                                <div className="highlight-content">
                                    <h2>El epicentro de una <br className="br-desktop" />generación sin barreras</h2>
                                    <p>El espacio donde líderes del emprendimiento, empresarial e innovación se unieron para activar a una generación sin límites.</p>
                                    <div className="feature-list">
                                        {['Charlas Inspiradoras', 'Talleres y Conversatorios', 'Feria Universitaria'].map((f, i) => (
                                            <div key={i} className="feature-item">
                                                <CheckCircle2 color="#ff8ab1" />
                                                <span style={{ fontWeight: 600 }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="highlight-visual">
                                    <div style={{ padding: '40px', background: 'var(--glass-bg)', borderRadius: '40px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <Star size={48} opacity={0.2} style={{ marginBottom: '20px' }} />
                                        <h3>Próxima Edición</h3>
                                        <p>CEINA – OCTUBRE 2026</p>
                                    </div>
                                </div>
                            </section>

                            {/* NUEVA SECCIÓN: UBICACIÓN */}
                            <section className="venue-section">
                                <div className="section-header venue-header">
                                    <h2>¿Dónde nos vemos?</h2>
                                    <p>El Congreso se realiza en el corazón de Santiago.</p>
                                </div>
                                <div className="venue-grid">
                                    <div className="venue-info">
                                        <div className="venue-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxE9yI6TjM60gmPzzyEPM6p4DixTpJogZiQ0joTicJtjbbqiHJmBjEAYYJtvMo_WLknkyUMtsgKb8z9SSz1PemTqjRuhJ9l_dOl2hY1T2gNxPTyWkYIzEgBhs0juAVNduF3PQqr=s680-w680-h510-rw"
                                                alt="Sede CEINA"
                                                style={{ objectPosition: 'center' }}
                                            />
                                        </div>
                                        <div className="venue-details">
                                            <MapPin className="pin-icon" />
                                            <div style={{ flex: 1 }}>
                                                <h3>CEINA</h3>
                                                <p>Arturo Prat 33, Santiago Centro</p>
                                                <a
                                                    href="https://maps.app.goo.gl/YyRxe3QpG2qM7FpU7"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="map-link"
                                                    style={{ color: '#ff8ab1', fontSize: '0.85rem', fontWeight: 600, marginTop: '8px', display: 'inline-block', textDecoration: 'none' }}
                                                >
                                                    Ver en Google Maps →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="venue-map">
                                        <iframe
                                            src="https://www.google.com/maps?q=CEINA+Santiago&amp;output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                </div>
                            </section>

                            {/* NUEVA SECCIÓN: FAQ */}
                            <section className="faq-section">
                                <div className="section-header">
                                    <HelpCircle size={40} className="faq-icon" />
                                    <h2>Preguntas Frecuentes</h2>
                                </div>
                                <div className="faq-list">
                                    {[
                                        { q: "¿Quiénes pueden asistir?", a: "El evento está abierto a todos los jóvenes escolares y universitarios, emprendedores y personas interesadas en aprender." },
                                        { q: "¿Tiene costo la entrada?", a: "El Congreso HiveYoung es un evento gratuito, pero requiere inscripción previa ya que los cupos son limitados." },
                                        { q: "¿Habrá comida durante el evento?", a: "Contaremos con estaciones de hidratación. La alimentación está considerada únicamente para colegios previamente registrados." },
                                        { q: "¿Es presencial u online?", a: "Es un evento 100% presencial." },
                                        { q: "¿Cuánto dura el congreso?", a: "El congreso se desarrolla durante una jornada completa, con una programación continua de charlas, talleres, conversatorios y actividades artísticas." },
                                        { q: "¿Cómo puedo participar o colaborar?", a: "Puedes hacerlo a través del formulario de contacto del sitio web, ya sea como aliado o sponsor. Si te interesa participar como voluntario, puedes hacerlo desde la sección Únete." },
                                        { q: "¿Qué debo llevar al evento?", a: "Te recomendamos llevar tu entrada digital, identificación personal y muchas ganas de aprender y participar." }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className={`faq-item ${expandedFaq === i ? 'active' : ''}`}
                                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                        >
                                            <div className="faq-question">
                                                <h4>{item.q}</h4>
                                                <ChevronDown
                                                    size={20}
                                                    style={{
                                                        transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {expandedFaq === i && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="faq-answer"
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    >
                                                        <p>{item.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>

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
                        <motion.div
                            key="speakers"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                        >
                            <div className="section-header">
                                <h2>Nuestros Speakers</h2>
                                <p>Lideres, emprendedores y visionarios que están definiendo el futuro.</p>
                            </div>

                            <div className="speakers-controls">
                                <div className="search-wrapper">
                                    <Search className="search-icon" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o empresa..."
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="filter-tags">
                                    {availableCategories.map(cat => (
                                        <button
                                            key={cat}
                                            className={`tag-btn ${activeCategory === cat ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="speakers-grid">
                                {filteredSpeakers.map((speaker) => (
                                    <motion.div
                                        layout
                                        key={speaker.id}
                                        className="speaker-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="speaker-avatar">
                                            {speaker.img && (
                                                <img
                                                    src={speaker.img}
                                                    alt={speaker.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                                />
                                            )}
                                        </div>
                                        <h4 className="speaker-name">{speaker.name}</h4>
                                        <p className="speaker-role">{speaker.role}</p>
                                        <p className="speaker-company">{speaker.company}</p>
                                        <div className="speaker-card-tags">
                                            {speaker.tags.map((tag: string) => (
                                                <span key={tag} className="card-tag">#{tag}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* MOMENTOS */}
                    {activeSection === 'momentos' && (
                        <motion.div
                            key="momentos"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="resumen-grid"
                        >
                            <div className="section-header">
                                <h2>Momentos</h2>
                                <p>Revive la energía y los mejores instantes del congreso.</p>
                            </div>
                            <div className="momentos-grid">
                                {[
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766510857/Orquesta_1_yzgvao.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512549/Tres_o062mf.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681260/IMG_1780_rrrrjc.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766536322/Guys_1_x2jbh7.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512713/Participacion_1_uvfjiq.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512767/IMG_1994-Mejorado-NR_obmhj3.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681074/IMG_0008_zqu4dr.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766673917/IMG_1949_basypv.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684852/IMG_9768_zun8u5.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684680/IMG_1913_rne4wd.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684690/IMG_2083-Mejorado-NR_jonwir.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684685/IMG_1934_1_j97axx.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684720/IMG_2027-Mejorado-NR_bueblx.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512618/Panel_zz5lbb.jpg",
                                    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766673944/IMG_1958_gznyqx.jpg"
                                ].map((url, i) => (
                                    <div key={i} className="momento-item">
                                        <img
                                            src={url}
                                            alt={`Momento ${i + 1}`}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="congreso-footer">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <img src="/Logo.svg" alt="HiveYoung Logo" style={{ height: '65px', width: 'auto' }} />
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
        </div>
    );
}

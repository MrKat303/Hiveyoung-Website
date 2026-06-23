"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Mic2, 
  Instagram, 
  Linkedin, 
  Mail,
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  Users,
  User,
  PersonStanding,
  Baby,
  Accessibility
} from 'lucide-react';
import './congreso.css';

// Congress Pillars
const PILLARS = [
  {
    title: "Liderazgo Activo",
    description: "Espacios de debate, paneles y conversatorios liderados por jóvenes agentes de cambio que redefinen el ecosistema.",
    icon: <Mic2 size={18} />
  },
  {
    title: "Emprendimiento Real",
    description: "Mentorías, pitchs en vivo y redes de conexión para proyectos con ambición e impacto real.",
    icon: <LayoutDashboard size={18} />
  },
  {
    title: "Tecnología Aplicada",
    description: "Talleres interactivos sobre IA, herramientas digitales, desarrollo de productos y futuro laboral.",
    icon: <Calendar size={18} />
  }
];

const SolidPersonIcon = ({ className, ...props }: any) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className} {...props}>
    <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2 5c-1.1 0-2 .9-2 2v5h2v7h4v-7h2V9c0-1.1-.9-2-2-2h-4z"/>
  </svg>
);

const CountUpNumber = ({ target, duration = 2000 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    let animationFrame: number;
    let timeoutId: NodeJS.Timeout;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(target);
        timeoutId = setTimeout(() => {
          startTimestamp = null;
          animationFrame = window.requestAnimationFrame(step);
        }, 3000); // Restart the loop after 3 seconds
      }
    };
    animationFrame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      clearTimeout(timeoutId);
    };
  }, [target, duration, isVisible]);

  const formattedNumber = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return <div className="stat-big-num" ref={ref}>+{formattedNumber}</div>;
};

export default function CongresoClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="new-congreso-root">
      {/* Background Orbs & noise */}
      <div className="bg-mesh-container">
        <div className="glow-orb-c orb-primary"></div>
        <div className="glow-orb-c orb-accent"></div>
        <div className="noise-overlay-c"></div>
      </div>

      {/* Floating Centered Navbar */}
      <nav className={`nav-glass-c ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <a href="#pilares" onClick={(e) => handleScroll(e, 'pilares')}>Ejes</a>
          <a href="#participar" onClick={(e) => handleScroll(e, 'participar')}>Participar</a>
        </div>
        
        <Link href="/congreso" className="nav-logo-center">
          <Image 
            src="/images/congreso/logo-congreso.svg" 
            alt="Congreso HiveYoung Logo" 
            width={240} 
            height={65} 
            className="nav-logo-img" 
            priority
          />
        </Link>
        
        <div className="nav-right">
          <Link href="/2025">Ediciones</Link>
          <a href="#participar" onClick={(e) => handleScroll(e, 'participar')} className="nav-cta-btn">
            Inscribirse
          </a>
        </div>
        
        <button className="nav-hamburger-c" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} color="var(--congreso-bg)" /> : <Menu size={24} color="var(--congreso-bg)" />}
        </button>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="mobile-nav-menu">
            <a href="#pilares" onClick={(e) => handleScroll(e, 'pilares')}>Ejes</a>
            <a href="#participar" onClick={(e) => handleScroll(e, 'participar')}>Participar</a>
            <Link href="/2025" onClick={() => setIsMenuOpen(false)}>Ediciones</Link>
            <a href="#participar" onClick={(e) => handleScroll(e, 'participar')} className="mobile-cta-btn">Inscribirse</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="intro" className="hero-c">
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          
          <h1 className="hero-title-c">
            Inspirando a quienes <br />
            <span className="hero-title-gradient">construirán el futuro</span>
          </h1>
          
          <p className="hero-description-c">
            Las grandes transformaciones comienzan con una idea, una conversación o una pregunta. El Congreso HiveYoung nace para acercar a los jóvenes a las ideas, tecnologías, desafíos y oportunidades que están definiendo el mundo del mañana.
          </p>
          
          <div className="hero-ctas-c">
            <a href="#participar" onClick={(e) => handleScroll(e, 'participar')} className="btn-c btn-primary-c">
              Sé parte del Congreso
            </a>
            <Link href="/2025" className="btn-c btn-outline-c">
              Ver Edición 2025 <ArrowUpRight size={13} style={{ display: 'inline-block', marginLeft: '4px', verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </header>

      {/* Quote Section */}
      <section className="quote-section" style={{ padding: '80px 24px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 'normal', color: 'var(--white)', lineHeight: 1.4 }}>
          Las ideas tienen el poder de cambiar comunidades, inspirar movimientos y transformar sociedades.
        </h2>
      </section>

      {/* Purpose Section */}
      <section id="proposito" className="hardmode-section">
        <div className="hardmode-container">
          <div className="hardmode-grid-pattern"></div>
          <div className="hardmode-content">
            <div className="hardmode-left">
              <h2 style={{ textTransform: 'uppercase' }}>
                La experiencia <br />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                  HiveYoung
                  <TrendingUp size={36} color="var(--white)" style={{ opacity: 0.8 }} />
                </span>
              </h2>
            </div>
            
            <div className="hardmode-right">
              <p>
                El <strong>Congreso HiveYoung</strong> es una iniciativa organizada por jóvenes para jóvenes, creada con el propósito de acercar a las nuevas generaciones a las ideas, tecnologías, desafíos y oportunidades que están definiendo el futuro.
              </p>
              <p>
                Nuestro objetivo es construir un espacio donde la juventud no sea solo espectadora de los cambios de la sociedad, sino una protagonista capaz de imaginar, cuestionar y crear el futuro que desea ver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pilares" className="pillars-section">
        <div className="section-header-c">
          <span className="section-badge-c">Ejes principales</span>
          <h2>Diseñado para el Impacto</h2>
        </div>
        
        <div className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <article className="pillar-card" key={i}>
              <div className="pillar-icon-wrap">
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Community Visual Stats Section */}
      <section className="event-stats-section">
        <div className="stats-card-main">
          <div className="stat-left" style={{ display: 'flex', gap: '32px' }}>
            <div>
              <CountUpNumber target={2100} duration={2500} />
              <p className="stat-label-text">Asistentes</p>
            </div>
            <div>
              <CountUpNumber target={30} duration={2500} />
              <p className="stat-label-text">Speakers</p>
            </div>
          </div>
          
          <div className="stat-crowd-grid" aria-hidden="true">
            <p style={{ fontSize: '0.75rem', color: 'var(--white)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Nuestra Red Activa:
            </p>
            <div className="crowd-dot-row">
              {Array.from({ length: 32 }).map((_, index) => (
                <SolidPersonIcon 
                  key={index} 
                  className="crowd-user-icon"
                />
              ))}
            </div>
          </div>

          <p className="stat-blurb-text">
            Más de dos mil asistentes y decenas de expositores han formado parte de una experiencia que impulsa el aprendizaje, la colaboración y el intercambio de ideas, inspirando a las nuevas generaciones a convertirse en agentes de cambio para la sociedad.
          </p>
        </div>
      </section>

      {/* Previous Edition Spotlight */}
      <section className="editions-section">
        <div className="editions-nav-card">
          <div className="editions-content">
            <h2>Edición Anterior: CEINA 2025</h2>
            <p>
              Reunimos a más de 20 expositores nacionales y música en vivo en el Centro de Extensión Instituto Nacional (CEINA). Revive las charlas y paneles de la jornada.
            </p>
            <Link href="/2025" className="btn-c btn-primary-c">
              Revivir Edición 2025
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Grid */}
      <section id="participar" className="want-participate-section">
        <div className="section-header-c">
          <span className="section-badge-c">Participa</span>
          <h2>¿Cómo sumarte?</h2>
        </div>
        
        <div className="participate-cards-grid">
          <div className="participate-card">
            <h3>Quiero ser Sponsor</h3>
            <p>
              Posiciona tu marca ante el talento joven del mañana y apoya el desarrollo de proyectos y comunidades de alto impacto.
            </p>
            <a href="mailto:contacto@hiveyoung.org?subject=Sponsor%20Congreso" className="participate-card-btn">
              Contactar Alianzas
            </a>
          </div>

          <div className="participate-card">
            <h3>Quiero ser Voluntario</h3>
            <p>
              Aprende en la práctica participando activamente de la producción, comunicaciones y logística detrás del evento juvenil más relevante.
            </p>
            <a href="https://forms.gle/s99mMj2qwkivi8p26" target="_blank" rel="noopener noreferrer" className="participate-card-btn">
              Postular
            </a>
          </div>

          <div className="participate-card">
            <h3>Quiero ser Expositor</h3>
            <p>
              Comparte tu visión o proyecto innovador sobre nuestro escenario para inspirar y conectar con escolares y universitarios.
            </p>
            <a href="mailto:contacto@hiveyoung.org?subject=Expositor%20Congreso" className="participate-card-btn">
              Enviar propuesta
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-c">
        <div className="footer-container-c">
          <div className="footer-brand-c">
            <Link href="/congreso">
              <Image 
                src="/images/congreso/logo-congreso.svg" 
                alt="Congreso HiveYoung Logo" 
                width={240} 
                height={65} 
                style={{ width: 'auto', height: '62px' }}
              />
            </Link>
            <p>Creado por jóvenes, impulsado por ideas y construido para el futuro.</p>
            
            <div className="footer-socials-c">
              <a href="https://instagram.com/hiveyoung.cl" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="https://linkedin.com/company/hiveyoung" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Linkedin">
                <Linkedin size={14} />
              </a>
              <a href="mailto:contacto@hiveyoung.org" className="social-circle-btn" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>

          <div className="footer-col-c">
            <h4>Secciones</h4>
            <ul className="footer-links-c">
              <li><a href="#intro" onClick={(e) => handleScroll(e, 'intro')}>Inicio</a></li>
              <li><a href="#proposito" onClick={(e) => handleScroll(e, 'proposito')}>Propósito</a></li>
              <li><a href="#pilares" onClick={(e) => handleScroll(e, 'pilares')}>Ejes</a></li>
            </ul>
          </div>

          <div className="footer-col-c">
            <h4>Ediciones</h4>
            <ul className="footer-links-c">
              <li><Link href="/2025">Congreso HiveYoung 2025</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-c">
          <p>&copy; 2026 HiveYoung. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

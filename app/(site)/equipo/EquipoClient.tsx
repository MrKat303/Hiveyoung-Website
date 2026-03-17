"use client";

import { useRef, useState } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import Image from "next/image";
import "./Equipo.css";
import { direccionEjecutiva, coordinadoresRegionales, directorio, equipoGeneral, Miembro } from "@/data/equipo";
import { ChevronLeft, ChevronRight, ChevronUp, Linkedin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

    const CreativeCard = ({ miembro, className = "equipo-card", isPrivate = false, priority = false }: { miembro: Miembro; className?: string; isPrivate?: boolean; priority?: boolean }) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<HTMLDivElement>(null);

        useGSAP(() => {
            if (!innerRef.current || !cardRef.current) return;
            
            const tl = gsap.timeline({ 
                paused: true,
                defaults: { duration: 0.6, ease: "expo.inOut" }
            });

            tl.to(innerRef.current, { rotateY: 180 })
              .to(cardRef.current, { scale: 1.05, y: -10 }, 0);

            const enter = () => tl.play();
            const leave = () => tl.reverse();

            cardRef.current.addEventListener("mouseenter", enter);
            cardRef.current.addEventListener("mouseleave", leave);
            
            return () => {
                cardRef.current?.removeEventListener("mouseenter", enter);
                cardRef.current?.removeEventListener("mouseleave", leave);
            };
        }, { scope: cardRef });

        const getImagePath = (url: string | null) => {
            if (!url) return null;
            if (isPrivate && url.startsWith('https://res.cloudinary.com/')) {
                return url.replace('https://res.cloudinary.com/', '/_private/cloudinary/');
            }
            return url;
        };

        return (
            <div ref={cardRef} className={`${className} creative-card-wrapper reveal`}>
                <div ref={innerRef} className="creative-card-inner">
                    {/* Front */}
                    <div className="creative-card-front">
                        <div className="creative-image-container">
                            {miembro.img ? (
                                <Image
                                    src={getImagePath(miembro.img)!}
                                    alt={miembro.alt || `${miembro.nombre} - ${miembro.cargo} HiveYoung`}
                                    fill
                                    className="creative-image"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    draggable={false}
                                    priority={priority}
                                />
                            ) : (
                                <div className="creative-image-placeholder">
                                    <span className="placeholder-initial">{miembro.nombre.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="creative-info-simple">
                            <h3 className="creative-name-simple">{miembro.nombre}</h3>
                            {miembro.cargo !== "Equipo" && (
                                <p className="creative-role-simple">{miembro.cargo}</p>
                            )}
                        </div>
                    </div>
                    {/* Back */}
                    <div className="creative-card-back">
                        <div className="back-content-simple">
                            <h3>{miembro.nombre}</h3>
                            <p className="descripcion">
                                {miembro.descripcion || "Apasionado por transformar la comunidad y crear un impacto positivo."}
                            </p>
                            
                            {miembro.linkedin ? (
                                <a 
                                    href={miembro.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="linkedin-link-simple"
                                >
                                    <Linkedin size={24} />
                                </a>
                            ) : (
                                <div className="linkedin-link-simple disabled">
                                    <Linkedin size={24} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DirectorioCard = ({ miembro }: { miembro: Miembro }) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<HTMLDivElement>(null);

        useGSAP(() => {
            if (!innerRef.current || !cardRef.current) return;
            
            const tl = gsap.timeline({ 
                paused: true,
                defaults: { duration: 0.6, ease: "expo.inOut" }
            });

            tl.to(innerRef.current, { rotateY: 180 })
              .to(cardRef.current, { y: -10 }, 0);

            const enter = () => tl.play();
            const leave = () => tl.reverse();

            cardRef.current.addEventListener("mouseenter", enter);
            cardRef.current.addEventListener("mouseleave", leave);
            
            return () => {
                cardRef.current?.removeEventListener("mouseenter", enter);
                cardRef.current?.removeEventListener("mouseleave", leave);
            };
        }, { scope: cardRef });

        return (
            <div ref={cardRef} className="directorio-card-new reveal">
                <div ref={innerRef} className="directorio-card-inner">
                    {/* Front Face */}
                    <div className="directorio-card-front">
                        <div className="directorio-image-container">
                            {miembro.img ? (
                                <Image
                                    src={miembro.img.startsWith('https://res.cloudinary.com/') 
                                        ? miembro.img.replace('https://res.cloudinary.com/', '/_private/cloudinary/') 
                                        : miembro.img}
                                    alt={miembro.alt || `${miembro.nombre} - ${miembro.cargo} HiveYoung`}
                                    fill
                                    className="directorio-image-new"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    draggable={false}
                                />
                            ) : (
                                <div className="directorio-placeholder-new">
                                    <span>{miembro.nombre.charAt(0)}</span>
                                </div>
                            )}
                            
                            <div className="directorio-floating-label">
                                <div className="label-text-content">
                                    <h4>{miembro.nombre}</h4>
                                    <span>{miembro.cargo}</span>
                                </div>
                                <div className="label-linkedin">
                                    {miembro.linkedin ? (
                                        <Linkedin size={18} fill="currentColor" />
                                    ) : (
                                        <Linkedin size={18} opacity={0.3} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Face */}
                    <div className="directorio-card-back">
                        <div className="back-content-simple">
                            <h3>{miembro.nombre}</h3>
                            <p className="descripcion">
                                {miembro.descripcion || "Liderando con visión y compromiso."}
                            </p>
                            {miembro.linkedin ? (
                                <a 
                                    href={miembro.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="linkedin-link-simple"
                                >
                                    <Linkedin size={24} />
                                </a>
                            ) : (
                                <div className="linkedin-link-simple disabled">
                                    <Linkedin size={24} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default function EquipoPage() {
    useScrollReveal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showGeneral, setShowGeneral] = useState(false);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    return (
        <div className="equipo-page">
            <div className="equipo-header-wrapper">
                <header className="equipo-header reveal">
                    <h1>Nuestro Equipo</h1>
                    <p>HiveYoung está <span className="highlight-text">liderado por jóvenes</span> comprometidos que, desde sus distintos espacios, impulsan sus ideas y talentos para generar impacto</p>
                </header>
                <div className="asterisk-container asterisk-right reveal">
                    <img
                        src="/images/Draws/Asterisk.svg"
                        alt=""
                        className="asterisk-svg floating-asterisk"
                        draggable={false}
                    />
                </div>
            </div>

            <div className="equipo-container">
                <section className="equipo-seccion">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Dirección Ejecutiva</h2>
                        <svg className="titulo-subrayado-verde reveal" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5C35 3 65 7 95 5C108 4 115 6 117 5" stroke="#59c985" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="equipo-grid">
                        {direccionEjecutiva.map((m) => <CreativeCard key={m.id} miembro={m} priority={true} />)}
                    </div>
                </section>

                <section className="equipo-seccion">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Coordinadores Regionales</h2>
                        <svg className="titulo-subrayado-verde reveal" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5C35 3 65 7 95 5C108 4 115 6 117 5" stroke="#59c985" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="equipo-grid">
                        {coordinadoresRegionales.map((m) => <CreativeCard key={m.id} miembro={m} />)}
                    </div>
                </section>

                <section className="equipo-seccion directorio-section">
                    <div className="titulo-wrapper reveal">
                        <h2 className="seccion-titulo">Directorio</h2>
                        <svg className="titulo-subrayado-verde reveal" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5C35 3 65 7 95 5C108 4 115 6 117 5" stroke="#59c985" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="directorio-carousel-container reveal">
                        <button className="carousel-btn prev" onClick={scrollLeft} aria-label="Anterior">
                            <ChevronLeft size={28} />
                        </button>
                        <div className="directorio-grid carousel-track" ref={scrollRef}>
                            {directorio.map((m) => <DirectorioCard key={m.id} miembro={m} />)}
                        </div>
                        <button className="carousel-btn next" onClick={scrollRight} aria-label="Siguiente">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </section>

                <section className="equipo-seccion-toggle">
                    {showGeneral && (
                        <section className="equipo-seccion-revealed">
                            <div className="titulo-wrapper reveal active">
                                <h2 className="seccion-titulo">Equipo</h2>
                                <svg className="titulo-subrayado-verde reveal active" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5C35 3 65 7 95 5C108 4 115 6 117 5" stroke="#59c985" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="equipo-grid equipo-general-grid revealed-grid">
                                {equipoGeneral.map((m) => <CreativeCard key={m.id} miembro={m} className="creative-card-smaller" isPrivate={true} />)}
                            </div>
                        </section>
                    )}
                    
                    <div className="ver-mas-container">
                        <button className={`ver-mas-btn ${showGeneral ? 'expanded' : ''}`} onClick={() => setShowGeneral(!showGeneral)}>
                            {showGeneral ? 'Ver menos' : 'Ver más'}
                            {showGeneral ? <ChevronUp size={20} /> : <ChevronRight size={20} />}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

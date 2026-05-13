"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { ChevronDown, ArrowRightToSquare, LogoLinkedin, Envelope } from "@gravity-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

import { navigationLinks } from "../../data/navigation";

// Sub-component for the animated hamburger icon
const HamburgerIcon = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <button 
            className={`nav-hamburger ${isOpen ? 'is-open' : ''}`} 
            onClick={onClick} 
            aria-label="Menu"
        >
            <span className="hamburger-line top"></span>
            <span className="hamburger-line middle"></span>
            <span className="hamburger-line bottom"></span>
        </button>
    );
};

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [exitAnimationEnabled, setExitAnimationEnabled] = useState(true);
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    const toggleMenu = () => {
        setExitAnimationEnabled(true);
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = useCallback(() => {
        setExitAnimationEnabled(true);
        setIsMenuOpen(false);
    }, []);

    const handleNavClick = (path: string) => {
        const excludedPaths = ["/", "/historia"];
        const willHaveCurtain = !excludedPaths.includes(path);
        
        if (willHaveCurtain) {
            // No cerramos el menú aquí. Dejamos que la cortina de la siguiente página lo cubra.
            // El useEffect se encargará de cerrarlo por detrás una vez que cambie la ruta.
            setExitAnimationEnabled(false);
        } else {
            setExitAnimationEnabled(true);
            setIsMenuOpen(false);
        }
    };

    // Close menu when route changes (fallback and sync with curtain)
    useEffect(() => {
        // Cuando cambia la ruta, nos aseguramos de que el menú esté cerrado.
        // Si venimos de una página con cortina, exitAnimationEnabled ya será false.
        setIsMenuOpen(false);
    }, [pathname]);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const links = navigationLinks;

    const menuVariants = {
        closed: {
            opacity: 0,
            transition: {
                type: "tween" as const,
                duration: 0.2, // Muy rápido para evitar choques
                ease: "easeInOut" as const,
                staggerChildren: 0.02,
                staggerDirection: -1,
                when: "afterChildren" as const
            }
        },
        opened: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1,
                delayChildren: 0.15
            }
        }
    };

    const itemVariants = {
        opened: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        },
        closed: {
            y: -20,
            opacity: 0,
            transition: {
                type: "spring" as const,
                stiffness: 500,
                damping: 40
            }
        }
    };

    return (
        <nav className={`navbar ${isCongresoPage ? "navbar--glass-modern" : ""} ${isMenuOpen ? "is-active" : ""}`}>
            <div className="navbar-container">
                <Link className="navbar-logo" href="/" onClick={() => handleNavClick("/")}>
                    <Image
                        src="/Logo.svg"
                        alt="HiveYoung | Principal articulador del ecosistema juvenil"
                        width={90}
                        height={30}
                        className="logo-image no-interaction"
                        draggable={false}
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className="navbar-menu desktop-only">
                    {links.map((link, index) => (
                        <li key={index} className={link.dropdown ? "nav-item-dropdown" : ""}>
                            <Link href={link.path}>
                                {link.name}
                                {link.dropdown && <ChevronDown width={14} height={14} style={{ marginLeft: '4px' }} />}
                            </Link>
                            {link.dropdown && (
                                <ul className="dropdown-menu">
                                    {link.dropdown.map((sub, i) => (
                                        <li key={i}>
                                            <Link href={sub.path}>{sub.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Desktop Buttons */}
                <div className="navbar-btns desktop-only">
                    <Link className="navbar-btn navbar-btn--outline" href="/unete">Únete</Link>
                    <a href="https://app.hiveyoung.org/login" className="login-icon-circle">
                        <ArrowRightToSquare width={20} height={20} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-only">
                    {!isMenuOpen && <HamburgerIcon isOpen={isMenuOpen} onClick={toggleMenu} />}
                </div>

                {/* Mobile Menu Overlay & Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div 
                                className="mobile-menu-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={exitAnimationEnabled ? { opacity: 0 } : { opacity: 0, transition: { duration: 0 } }}
                                onClick={closeMenu}
                            />
                            <motion.div 
                                className="mobile-menu-drawer"
                                variants={menuVariants}
                                initial={{ y: "-100%", opacity: 0 }}
                                animate="opened"
                                exit={exitAnimationEnabled ? "closed" : { opacity: 0, transition: { duration: 0 } }}
                            >
                                <button className="mobile-close-btn" onClick={closeMenu} aria-label="Cerrar menú">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                                <div className="mobile-menu-content">
                                    <div className="mobile-menu-links">
                                        {links.map((link, index) => (
                                            <React.Fragment key={index}>
                                                <motion.div variants={itemVariants} className="mobile-link-item">
                                                    <Link href={link.path} onClick={() => handleNavClick(link.path)}>
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                                {link.dropdown && link.dropdown.map((sub, i) => (
                                                    <motion.div 
                                                        key={i} 
                                                        variants={itemVariants} 
                                                        className="mobile-link-subitem"
                                                    >
                                                        <Link href={sub.path} onClick={() => handleNavClick(sub.path)}>
                                                            {sub.name}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <motion.div 
                                        className="mobile-menu-footer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="mobile-actions">
                                            <Link href="/unete" className="mobile-btn-primary" onClick={() => handleNavClick("/unete")}>
                                                Únete
                                            </Link>
                                            <a href="https://app.hiveyoung.org/login" className="mobile-btn-outline" onClick={closeMenu}>
                                                <ArrowRightToSquare width={18} height={18} style={{ marginRight: '8px' }} /> Iniciar Sesión
                                            </a>
                                        </div>
                                        <div className="mobile-socials">
                                            <a href="https://www.instagram.com/hiveyoung.cl/" target="_blank" rel="noopener noreferrer">
                                                <Instagram size={22} />
                                            </a>
                                            <a href="https://www.linkedin.com/company/hiveyoung/" target="_blank" rel="noopener noreferrer">
                                                <LogoLinkedin width={22} height={22} />
                                            </a>
                                            <a href="mailto:contacto@hiveyoung.com">
                                                <Envelope width={22} height={22} />
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

export default Navbar;

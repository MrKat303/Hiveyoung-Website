"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, User, Instagram, Linkedin, Mail } from "lucide-react";
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
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    // Close menu when route changes
    useEffect(() => {
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
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 45,
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        },
        opened: {
            x: 0,
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
            x: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        },
        closed: {
            x: 30,
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
                <Link className="navbar-logo" href="/" onClick={closeMenu}>
                    <Image
                        src="/Logo.svg"
                        alt="HiveYoung - Principal articulador del ecosistema juvenil"
                        width={150}
                        height={50}
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
                                {link.dropdown && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
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
                    <Link className="navbar-btn navbar-btn--outline" href="/unete">Unete</Link>
                    <Link href="/login" className="login-icon-circle">
                        <User size={20} />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-only">
                    <HamburgerIcon isOpen={isMenuOpen} onClick={toggleMenu} />
                </div>

                {/* Mobile Menu Overlay & Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div 
                                className="mobile-menu-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeMenu}
                            />
                            <motion.div 
                                className="mobile-menu-drawer"
                                variants={menuVariants}
                                initial="closed"
                                animate="opened"
                                exit="closed"
                            >
                                <div className="mobile-menu-content">
                                    <div className="mobile-menu-links">
                                        {links.map((link, index) => (
                                            <React.Fragment key={index}>
                                                <motion.div variants={itemVariants} className="mobile-link-item">
                                                    <Link href={link.path} onClick={closeMenu}>
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                                {link.dropdown && link.dropdown.map((sub, i) => (
                                                    <motion.div 
                                                        key={i} 
                                                        variants={itemVariants} 
                                                        className="mobile-link-subitem"
                                                    >
                                                        <Link href={sub.path} onClick={closeMenu}>
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
                                            <Link href="/unete" className="mobile-btn-primary" onClick={closeMenu}>
                                                Unete
                                            </Link>
                                            <Link href="/login" className="mobile-btn-outline" onClick={closeMenu}>
                                                <User size={18} style={{ marginRight: '8px' }} /> Iniciar Sesión
                                            </Link>
                                        </div>
                                        <div className="mobile-socials">
                                            <a href="https://www.instagram.com/hiveyoung/" target="_blank" rel="noopener noreferrer">
                                                <Instagram size={22} />
                                            </a>
                                            <a href="https://www.linkedin.com/company/hiveyoung/" target="_blank" rel="noopener noreferrer">
                                                <Linkedin size={22} />
                                            </a>
                                            <a href="mailto:contacto@hiveyoung.com">
                                                <Mail size={22} />
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

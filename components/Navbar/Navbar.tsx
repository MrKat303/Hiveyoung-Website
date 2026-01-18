"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Navbar.css";

import { navigationLinks } from "../../data/navigation";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const links = navigationLinks;

    return (
        <nav className={`navbar ${isCongresoPage ? "navbar--glass-modern" : ""}`}>
            <div className="navbar-container">

                <div className={`navbar-toggle ${isMenuOpen ? "is-active" : ""}`} onClick={toggleMenu}>
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </div>

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

                <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
                    {links.map((link, index) => (
                        <li
                            key={index}
                            style={{ transitionDelay: isMenuOpen ? `${index * 0.1}s` : "0s" }}
                            className={`${isMenuOpen ? "fade-in" : ""} ${link.dropdown ? "nav-item-dropdown" : ""}`}
                        >
                            <Link href={link.path} onClick={closeMenu}>
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                            </Link>

                            {link.dropdown && (
                                <ul className="dropdown-menu">
                                    {link.dropdown.map((sub, i) => (
                                        <li key={i}>
                                            <Link href={sub.path} onClick={closeMenu}>
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li
                        className={`mobile-only ${isMenuOpen ? "fade-in" : ""}`}
                        style={{ transitionDelay: isMenuOpen ? `${links.length * 0.1}s` : "0s" }}
                    >
                        <Link href="/unete" onClick={closeMenu}>Únete</Link>
                    </li>

                </ul>

                <div className="navbar-btns desktop-only">
                    <Link className="navbar-btn navbar-btn--outline" href="/unete">Únete</Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;

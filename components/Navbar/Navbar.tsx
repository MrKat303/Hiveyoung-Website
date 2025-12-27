"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Navbar.css";

import { navigationLinks } from "../../data/navigation";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    const enlaces = navigationLinks;

    return (
        <nav className={`navbar ${isCongresoPage ? "navbar--glass-modern" : ""}`}>
            <div className="navbar-container">

                <div className={`navbar-toggle ${menuAbierto ? "is-active" : ""}`} onClick={toggleMenu}>
                    {menuAbierto ? <X size={32} /> : <Menu size={32} />}
                </div>

                <Link className="navbar-logo" href="/" onClick={cerrarMenu}>
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

                <ul className={`navbar-menu ${menuAbierto ? "active" : ""}`}>
                    {enlaces.map((link, index) => (
                        <li
                            key={index}
                            style={{ transitionDelay: menuAbierto ? `${index * 0.1}s` : "0s" }}
                            className={`${menuAbierto ? "fade-in" : ""} ${link.dropdown ? "nav-item-dropdown" : ""}`}
                        >
                            <Link href={link.path} onClick={cerrarMenu}>
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                            </Link>

                            {link.dropdown && (
                                <ul className="dropdown-menu">
                                    {link.dropdown.map((sub, i) => (
                                        <li key={i}>
                                            <Link href={sub.path} onClick={cerrarMenu}>
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="navbar-btns desktop-only">
                    <Link className="navbar-btn navbar-btn--outline" href="/unete">Únete</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    return (
        <footer className={`footer ${isCongresoPage ? "footer--glass" : ""}`}>
            <div className="footer__container">
                <div className="footer__main">
                    <div className="footer__brand-area">
                        <Link href="/" className="footer__logo-wrap">
                            <Image
                                src="/Logo.svg"
                                alt="HiveYoung"
                                width={120}
                                height={35}
                                className="footer__logo"
                                draggable={false}
                            />
                        </Link>
                        <div className="footer__contact-strip">
                            <a href="mailto:hiveyoung@gmail.com" className="footer__email">
                                hiveyoung@gmail.com
                            </a>
                            <div className="footer__social-links">
                                <a href="https://www.instagram.com/hiveyoung.cl/" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://cl.linkedin.com/company/hiveyoung" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="LinkedIn">
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer__nav-area">
                        <div className="footer__nav-group">
                            <h4 className="footer__group-title">Explorar</h4>
                            <nav className="footer__links">
                                <Link href="/somos" className="footer__link">Somos</Link>
                                <Link href="/equipo" className="footer__link">Equipo</Link>
                                <Link href="/advisory-board" className="footer__link">Advisory</Link>
                                <Link href="/historia" className="footer__link">Historia</Link>
                            </nav>
                        </div>

                        <div className="footer__nav-group">
                            <h4 className="footer__group-title">Participa</h4>
                            <nav className="footer__links">
                                <Link href="/unete" className="footer__link">Únete</Link>
                                <Link href="/contacto" className="footer__link">Contacto</Link>
                                <Link href="/login" className="footer__link">Login</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="footer__divider" />

                <div className="footer__bottom-section">
                    <p className="footer__copyright-text">
                        © {new Date().getFullYear()} HiveYoung. Todos los derechos reservados.
                    </p>
                    <div className="footer__legal-links">
                        <span className="footer__legal-link">Términos</span>
                        <span className="footer__legal-link">Privacidad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

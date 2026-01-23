"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Footer.css";

export default function Footer() {
    const pathname = usePathname();
    const isCongresoPage = pathname === "/congreso";

    return (
        <footer className={`footer ${isCongresoPage ? "footer--glass" : ""}`}>
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Image src="/Logo.svg" alt="HiveYoung - Ecosistema Juvenil" width={150} height={50} className="footer__logo" draggable={false} />
                        <p className="footer__email">hiveyoung@gmail.com</p>
                    </div>

                    <div className="footer__links">
                        <div className="footer__col">
                            <h4>PÁGINAS</h4>
                            <Link href="/somos">¿Quiénes somos?</Link>
                            <Link href="/equipo">Equipo</Link>
                        </div>

                        <div className="footer__col">
                            <h4>REDES SOCIALES</h4>
                            <a href="https://www.instagram.com/hiveyoung.cl/" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://cl.linkedin.com/company/hiveyoung" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="footer__divider" />

                <p className="footer__copyright">
                    HiveYoung © {new Date().getFullYear()} Copyright
                </p>
            </div>
        </footer>
    );
}

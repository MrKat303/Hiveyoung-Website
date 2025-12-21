import Link from "next/link";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <img src="/Logo.svg" alt="HiveYoung - Ecosistema Juvenil" className="footer__logo" draggable="false" />
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
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="footer__divider" />

                <p className="footer__copyright">
                    HiveYoung © 2025 Copyright
                </p>
            </div>
        </footer>
    );
}

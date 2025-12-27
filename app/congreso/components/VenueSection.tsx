import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export const VenueSection: React.FC = () => {
    return (
        <section className="venue-section">
            <div className="section-header venue-header">
                <h2>¿Dónde nos vemos?</h2>
                <p>El Congreso se realiza en el corazón de Santiago.</p>
            </div>
            <div className="venue-grid">
                <div className="venue-info">
                    <div className="venue-image">
                        <Image
                            src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxE9yI6TjM60gmPzzyEPM6p4DixTpJogZiQ0joTicJtjbbqiHJmBjEAYYJtvMo_WLknkyUMtsgKb8z9SSz1PemTqjRuhJ9l_dOl2hY1T2gNxPTyWkYIzEgBhs0juAVNduF3PQqr=s680-w680-h510-rw"
                            alt="Sede CEINA"
                            width={680}
                            height={510}
                            style={{ objectPosition: 'center', width: '100%', height: 'auto' }}
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
    );
};

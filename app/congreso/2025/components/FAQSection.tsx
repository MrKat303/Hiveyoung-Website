import React, { useState, useRef } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
    q: string;
    a: string;
}

const FAQ_ITEMS: FAQItem[] = [
    { q: "¿Quiénes pueden asistir?", a: "El evento está abierto a todos los jóvenes escolares y universitarios, emprendedores y personas interesadas en aprender." },
    { q: "¿Tiene costo la entrada?", a: "El Congreso HiveYoung es un evento gratuito, pero requiere inscripción previa ya que los cupos son limitados." },
    { q: "¿Habrá comida durante el evento?", a: "Contaremos con estaciones de hidratación. La alimentación está considerada únicamente para colegios previamente registrados." },
    { q: "¿Es presencial u online?", a: "Es un evento 100% presencial." },
    { q: "¿Cuánto dura el congreso?", a: "El congreso se desarrolla durante una jornada completa, con una programación continua de charlas, talleres, conversatorios y actividades artísticas." },
    { q: "¿Cómo puedo participar o colaborar?", a: "Puedes hacerlo a través del formulario de contacto del sitio web, ya sea como aliado o sponsor. Si te interesa participar como voluntario, puedes hacerlo desde la sección Únete." },
    { q: "¿Qué debo llevar al evento?", a: "Te recomendamos llevar tu entrada digital, identificación personal y muchas ganas de aprender y participar." }
];

export const FAQSection: React.FC = () => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="section-header faq-header-center">
                <HelpCircle size={48} className="faq-icon" />
                <h2>Preguntas Frecuentes</h2>
            </div>
            <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => {
                    const isOpen = expandedFaq === i;
                    return (
                        <div
                            key={i}
                            className={`faq-item ${isOpen ? 'active' : ''}`}
                            onClick={() => toggleFaq(i)}
                        >
                            <div className="faq-question">
                                <h4>{item.q}</h4>
                                <ChevronDown
                                    size={20}
                                    style={{
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            </div>
                            <div
                                className="faq-answer-wrapper"
                                style={{
                                    display: 'grid',
                                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                                    transition: 'grid-template-rows 0.3s ease-in-out'
                                }}
                            >
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="faq-answer">
                                        <p>{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

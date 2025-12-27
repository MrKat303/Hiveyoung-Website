import React from 'react';
import { Handshake, Heart, Globe, Lightbulb, Megaphone } from 'lucide-react';

export const SOMOS_VALUES = [
    {
        icon: React.createElement(Handshake, { size: 40, strokeWidth: 2, color: "#2eb67d" }),
        title: "Colaboración",
        color: "#2eb67d",
        description: "Construimos puentes y alianzas estratégicas. Entendemos que el impacto colectivo es más fuerte que el esfuerzo individual."
    },
    {
        icon: React.createElement(Heart, { size: 40, strokeWidth: 2, color: "#529ce8" }),
        title: "Compromiso",
        color: "#529ce8",
        description: "Nos entregamos con pasión y responsabilidad a nuestra causa, trabajando incansablemente por el bienestar de las juventudes."
    },
    {
        icon: React.createElement(Globe, { size: 40, strokeWidth: 2, color: "#c22359" }),
        title: "Diversidad e Inclusión",
        color: "#c22359",
        description: "Valoramos y celebramos la riqueza de las diferencias, creando espacios seguros donde todas las identidades pueden florecer."
    },
    {
        icon: React.createElement(Lightbulb, { size: 40, strokeWidth: 2, color: "#ffc100" }),
        title: "Creatividad e Innovación",
        color: "#ffc100",
        description: "Abrazamos el cambio y buscamos soluciones disruptivas. No tenemos miedo a pensar diferente para resolver los desafíos del futuro."
    },
    {
        icon: React.createElement(Megaphone, { size: 40, strokeWidth: 2, color: "#ee6352" }),
        title: "Incidencia",
        color: "#ee6352",
        description: "Alzamos la voz y actuamos para influir en las políticas públicas, posicionando a los jóvenes en el centro de la toma de decisiones."
    }
];

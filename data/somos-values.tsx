import React from 'react';
import { Handshake, Heart, Globe, Lightbulb, Megaphone } from 'lucide-react';

export const SOMOS_VALUES = [
    {
        icon: React.createElement(Handshake, { size: 40, strokeWidth: 2, color: "#2eb67d" }),
        title: "Colaboración",
        color: "#2eb67d",
        description: "Construimos puentes y alianzas estratégicas, entendiendo que el impacto colectivo siempre es más fuerte que el esfuerzo individual."
    },
    {
        icon: React.createElement(Globe, { size: 40, strokeWidth: 2, color: "#c22359" }),
        title: "Diversidad",
        color: "#c22359",
        description: "Valoramos y respetamos la diversidad en todas sus formas. Creemos que las distintas experiencias, ideas y perspectivas enriquecen nuestra comunidad y la hacen más fuerte."
    },
    {
        icon: React.createElement(Heart, { size: 40, strokeWidth: 2, color: "#529ce8" }),
        title: "Compromiso",
        color: "#529ce8",
        description: "Nos entregamos con pasión y responsabilidad a nuestra causa, trabajando incansablemente para impulsar nuestra iniciativas."
    },
    {
        icon: React.createElement(Lightbulb, { size: 40, strokeWidth: 2, color: "#ffc100" }),
        title: "Creatividad e Innovación",
        color: "#ffc100",
        description: "Abrazamos el cambio y buscamos soluciones disruptivas. Nos gusta desafiar paradigmas, romper barreras y pensar diferente para enfrentar los desafíos del futuro."
    }
];

export interface Miembro {
    id: number;
    nombre: string;
    cargo: string;
    img: string | null;
}

export const direccionEjecutiva: Miembro[] = [
    { id: 1, nombre: "Cristian Suárez", cargo: "Cofundador", img: "/images/equipo/cristian.jpg" },
    { id: 2, nombre: "Vicente Olguín", cargo: "Cofundador", img: "/images/equipo/vicente.jpeg" },
    { id: 3, nombre: "Lucas Galleguillos", cargo: "Cofundador", img: "/images/equipo/lucas.jpg" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora", img: "/images/equipo/ale.jpg" },
    { id: 5, nombre: "Dante Espinoza", cargo: "Director", img: "/images/equipo/dante.jpg" },
    { id: 6, nombre: "Lucas Valenzuela", cargo: "Asistente VP", img: "/images/equipo/valenzuela.jpg" },
    { id: 7, nombre: "Sergio Álvarez", cargo: "Director", img: null },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: null },
    { id: 9, nombre: "Catalina Aranguiz", cargo: "Directora", img: null },
    { id: 10, nombre: "Integrante 10", cargo: "Cargo", img: null },
    { id: 11, nombre: "Integrante 11", cargo: "Cargo", img: null },
    { id: 12, nombre: "Integrante 12", cargo: "Cargo", img: null },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 101, nombre: "Coordinador 1", cargo: "Coordinador Regional", img: null },
    { id: 102, nombre: "Coordinador 2", cargo: "Coordinador Regional", img: null },
    { id: 103, nombre: "Coordinador 3", cargo: "Coordinador Regional", img: null },
];

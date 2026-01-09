export interface Miembro {
    id: number;
    nombre: string;
    cargo: string;
    img: string | null;
}

export const direccionEjecutiva: Miembro[] = [
    { id: 1, nombre: "Cristian Suárez", cargo: "Presidente ejecutivo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456546/cristian_xjy5pr.jpg" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora Ejecutiva", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456543/ale_g5nl2k.jpg" },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 101, nombre: "Coordinador 1", cargo: "Coordinador Regional", img: null },
    { id: 102, nombre: "Coordinador 2", cargo: "Coordinador Regional", img: null },
    { id: 103, nombre: "Coordinador 3", cargo: "Coordinador Regional", img: null },
];

export const directorio: Miembro[] = [
    { id: 2, nombre: "Vicente Olguín", cargo: "Presidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456547/vicente_acjaaq.jpg" },
    { id: 3, nombre: "Lucas Galleguillos", cargo: "Vicepresidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456544/lucas_gyxijc.jpg" },
    { id: 201, nombre: "Camilo Jimenez", cargo: "Secretario", img: null },
    { id: 5, nombre: "Dante Espinoza", cargo: "Tesorero", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456542/dante_ywvrbw.jpg" },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: null },
    { id: 202, nombre: "Maglio Olguin", cargo: "Director", img: null },
    { id: 203, nombre: "Martina Rodriguez", cargo: "Directora", img: null },
];

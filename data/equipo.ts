export interface Miembro {
    id: number;
    nombre: string;
    cargo: string;
    img: string | null;
    descripcion?: string;
    linkedin?: string;
}

export const direccionEjecutiva: Miembro[] = [
    { id: 1, nombre: "Cristian Suárez", cargo: "Presidente ejecutivo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773020257/df4905f5-a7ac-42b2-9b6e-b9b429347703_tjbwo0.jpg", descripcion: "Cofundador, emprendedor, apasionado por el emprendimiento y la tecnología.", linkedin: "https://linkedin.com/" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora Ejecutiva", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456543/ale_g5nl2k.jpg", descripcion: "Estudiante de Ingeniería Comercial en la Universidad de Chile. Apasionada por las artes escénicas.", linkedin: "https://linkedin.com/" },
    { id: 6, nombre: "Santiago Oviedo", cargo: "Director de Ecosistema", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773017344/Generated_Image_March_08_2026_-_9_48PM_gxyjsy.png", descripcion: "Potenciando las alianzas y el desarrollo estratégico.", linkedin: "https://linkedin.com/" },
    { id: 7, nombre: "Martina Ortega", cargo: "Directora de Marketing", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016989/WhatsApp_Image_2026-02-18_at_14.01.34_kndbdk.jpg", descripcion: "Comunicando nuestra visión al mundo.", linkedin: "https://linkedin.com/" },
    { id: 9, nombre: "Mateo Bartolucci", cargo: "Head of People", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773017135/Generated_Image_March_08_2026_-_9_44PM_zat1tc.png", descripcion: "Estudiante del Colegio Inmaculada Concepción de Vitacura, soñando con una mejor educación para chile", linkedin: "https://linkedin.com/" },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 101, nombre: "Coordinador 1", cargo: "Coordinador Regional", img: null },
    { id: 102, nombre: "Coordinador 2", cargo: "Coordinador Regional", img: null },
    { id: 103, nombre: "Coordinador 3", cargo: "Coordinador Regional", img: null },
];

export const directorio: Miembro[] = [
    { id: 2, nombre: "Vicente Olguín", cargo: "Presidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016660/vicente_acjaaq_mpul3d.jpg", linkedin: "https://linkedin.com/" },
    { id: 201, nombre: "Camilo Jimenez", cargo: "Secretario", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016052/WhatsApp_Image_2026-03-08_at_21.14.00_qui4ag.jpg", linkedin: "https://linkedin.com/" },
    { id: 5, nombre: "Dante Espinoza", cargo: "Tesorero", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456542/dante_ywvrbw.jpg", linkedin: "https://linkedin.com/" },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016728/SC_3_vnnhck.jpg", linkedin: "https://linkedin.com/" },
    { id: 202, nombre: "Maglio Olguin", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016797/Generated_Image_March_08_2026_-_9_39PM_xlt5lg.png", linkedin: "https://linkedin.com/" },
    { id: 203, nombre: "Martina Rodriguez", cargo: "Directora", img: null },
];

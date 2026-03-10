export interface Miembro {
    id: number;
    nombre: string;
    cargo: string;
    img: string | null;
    descripcion?: string;
    linkedin?: string;
}

export const direccionEjecutiva: Miembro[] = [
    { id: 1, nombre: "Cristian Suárez", cargo: "Presidente ejecutivo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773020257/df4905f5-a7ac-42b2-9b6e-b9b429347703_tjbwo0.jpg", descripcion: "Cofundador de HiveYoung, emprendedor, apasionado por el emprendimiento y la tecnología.", linkedin: "https://linkedin.com/" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora Ejecutiva", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456543/ale_g5nl2k.jpg", descripcion: "Estudiante de Ingeniería Comercial en la Universidad de Chile. Apasionada por las artes escénicas.", linkedin: "https://linkedin.com/" },
    { id: 6, nombre: "Santiago Oviedo", cargo: "Director de Ecosistema", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773017344/Generated_Image_March_08_2026_-_9_48PM_gxyjsy.png", descripcion: "Estudiante de Ingeniería Comercial en la UC, Ex Miembro del Centro de Estudiantes del DVD.", linkedin: "https://linkedin.com/" },
    { id: 7, nombre: "Martina Ortega", cargo: "Directora de Marketing", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016989/WhatsApp_Image_2026-02-18_at_14.01.34_kndbdk.jpg", descripcion: "Estudiante del Instituto Nacional, me apasiona la ciencia y participo en movimientos femeninos como Tremendas y Lumina", linkedin: "https://linkedin.com/" },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 101, nombre: "Coordinador 1", cargo: "Coordinador Regional", img: null },
    { id: 102, nombre: "Coordinador 2", cargo: "Coordinador Regional", img: null },
    { id: 103, nombre: "Coordinador 3", cargo: "Coordinador Regional", img: null },
];

export const directorio: Miembro[] = [
    { id: 2, nombre: "Vicente Olguín", cargo: "Presidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016660/vicente_acjaaq_mpul3d.jpg", descripcion: "Estudiante de Ingeniería en la UC, cofundador de HiveYoung y Mejor Orador en el II Mundial Escolar de Debate en Español.", linkedin: "https://linkedin.com/" },
    { id: 204, nombre: "Lucas Galleguillos", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773103737/2f3fd6ca-c587-474c-a723-52008be3e98c_zqwhby.jpg", descripcion: "Cofundador de HiveYoung, apasionado por la Innovación Social.", linkedin: "https://linkedin.com/" },
    { id: 201, nombre: "Camilo Jimenez", cargo: "Secretario", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016052/WhatsApp_Image_2026-03-08_at_21.14.00_qui4ag.jpg", descripcion: "Estudiante de Historia en la Universidad de Chile, fundador del MUN Escolar.", linkedin: "https://linkedin.com/" },
    { id: 5, nombre: "Dante Espinoza", cargo: "Tesorero", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456542/dante_ywvrbw.jpg", descripcion: "Estudiante de Derecho en la UC, 2.º Mejor Orador Nacional 2023 y 2024 (debate).", linkedin: "https://linkedin.com/" },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016728/SC_3_vnnhck.jpg", descripcion: "Estudiante de Medicina en la UC, representante de Chile en las Olimpiadas de Matemáticas.", linkedin: "https://linkedin.com/" },
    { id: 202, nombre: "Maglio Olguin", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016797/Generated_Image_March_08_2026_-_9_39PM_xlt5lg.png", descripcion: "Estudiante de Ingeniería en la Universidad de Chile.", linkedin: "https://linkedin.com/" },
    { id: 203, nombre: "Martina Rodriguez", cargo: "Directora", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773091586/2bf3807f-ae89-4345-bb0e-83e6fbf3dcc0_qimd5a.jpg", descripcion: "Estudiante del Instituto Nacional interesada en la tecnología médica.", linkedin: "https://linkedin.com/" },
];
export const equipoGeneral: Miembro[] = [
    { id: 9, nombre: "Mateo Bartolucci", cargo: "Head of People", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773017135/Generated_Image_March_08_2026_-_9_44PM_zat1tc.png", descripcion: "Estudiante del Colegio Inmaculada Concepción de Vitacura, soñando con una mejor educación para chile", linkedin: "https://linkedin.com/" },
    { id: 301, nombre: "Ignacio Morales", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773086349/IMG-20241220-WA0020_x1j4aw.jpg", descripcion: "Estudiante de Derecho en la UC.", linkedin: "https://linkedin.com/" },
    { id: 302, nombre: "Angelo Ugalde", cargo: "Equipo", img: null, descripcion: "Estudiante de Ingeniería en la UC.", linkedin: "https://linkedin.com/" },
    { id: 303, nombre: "Javiera Cotet", cargo: "Equipo", img: null, linkedin: "https://linkedin.com/" },
    { id: 304, nombre: "Joaquin Salas", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773086348/1772071420958_ihex7s.jpg", descripcion: "Estudiante de Derecho en la UC.", linkedin: "https://linkedin.com/" },
    { id: 305, nombre: "Ignacia Vivet", cargo: "Equipo", img: null, linkedin: "https://linkedin.com/" },
    { id: 306, nombre: "Vicente Diaz", cargo: "Equipo", img: null, linkedin: "https://linkedin.com/" },
];

export interface Miembro {
    id: number;
    nombre: string;
    cargo: string;
    img: string | null;
    alt?: string;
    descripcion?: string;
    linkedin?: string;
}

export const direccionEjecutiva: Miembro[] = [
    { id: 1, nombre: "Cristian Suárez", cargo: "Presidente ejecutivo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773352707/Dise%C3%B1o_sin_t%C3%ADtulo_10_ojudv4.png", alt: "Cristian Suárez, cofundador y Presidente Ejecutivo de HiveYoung", descripcion: "Cofundador de HiveYoung, emprendedor, apasionado por el emprendimiento y la tecnología.", linkedin: "https://linkedin.com/" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora Ejecutiva", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773352246/Dise%C3%B1o_sin_t%C3%ADtulo_11_vybqch.png", alt: "Alessandra Mussuto, Directora Ejecutiva de HiveYoung", descripcion: "Estudiante de Ingeniería Comercial en la Universidad de Chile. Apasionada por las artes escénicas.", linkedin: "https://linkedin.com/" },
    { id: 6, nombre: "Santiago Oviedo", cargo: "Director de Ecosistema", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773352819/Generated_Image_March_08_2026_-_9_48PM_gxyjsy.png", alt: "Santiago Oviedo, Director de Ecosistema de HiveYoung", descripcion: "Estudiante de Ingeniería Comercial en la UC, Ex-Miembro del Centro de Estudiantes del CVD.", linkedin: "https://linkedin.com/" },
    { id: 7, nombre: "Martina Ortega", cargo: "Directora de Marketing", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773355651/WhatsApp_Image_2026-02-18_at_14.01.34_kndbdk.png", alt: "Martina Ortega, Directora de Marketing de HiveYoung", descripcion: "Estudiante del Instituto Nacional, me apasiona la ciencia y participo en movimientos femeninos como Tremendas y Lumina", linkedin: "https://linkedin.com/" },
    { id: 301, nombre: "Ignacio Morales", cargo: "Director de Proyectos Sociales", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773630639/3a1b4e_19_rc0hrz.png", alt: "Ignacio Morales, Director de Proyectos Sociales de HiveYoung", descripcion: "Estudiante de Derecho en la UC.", linkedin: "https://linkedin.com/" },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 101, nombre: "Clemente Pacheco", cargo: "Coordinador Regional RM", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773410775/3a1b4e_8_nquulw.png", alt: "Clemente Pacheco, Coordinador Regional RM de HiveYoung", descripcion: "Estudiante del Grange School.", linkedin: "https://linkedin.com/" },
    { id: 102, nombre: "María Ignacia", cargo: "Coordinadora Regional Valparaíso", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773618199/3a1b4e_18_qdnqdy.png", alt: "María Ignacia, Coordinadora Regional Valparaíso de HiveYoung", descripcion: "", linkedin: "https://linkedin.com/" },
];

export const directorio: Miembro[] = [
    { id: 2, nombre: "Vicente Olguín", cargo: "Presidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016660/vicente_acjaaq_mpul3d.jpg", alt: "Vicente Olguín, cofundador y Presidente de HiveYoung", descripcion: "Estudiante de Ingeniería en la UC, cofundador de HiveYoung y Mejor Orador en el II Mundial Escolar de Debate en Español.", linkedin: "https://linkedin.com/" },
    { id: 204, nombre: "Lucas Galleguillos", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773337344/cdb6ff20-1ebc-4316-a9b9-ed562ffa7afb_yxga8k.jpg", alt: "Lucas Galleguillos, cofundador y Director de HiveYoung", descripcion: "Cofundador de HiveYoung, apasionado por la Innovación Social.", linkedin: "https://linkedin.com/" },
    { id: 201, nombre: "Camilo Jimenez", cargo: "Secretario", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016052/WhatsApp_Image_2026-03-08_at_21.14.00_qui4ag.jpg", alt: "Camilo Jimenez, Secretario de HiveYoung", descripcion: "Estudiante de Historia en la Universidad de Chile, fundador del MUN Escolar.", linkedin: "https://linkedin.com/" },
    { id: 5, nombre: "Dante Espinoza", cargo: "Tesorero", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456542/dante_ywvrbw.jpg", alt: "Dante Espinoza, Tesorero de HiveYoung", descripcion: "Estudiante de Derecho en la UC, 2.º Mejor Orador Nacional 2023 y 2024 (debate).", linkedin: "https://linkedin.com/" },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016728/SC_3_vnnhck.jpg", alt: "Sofía Cornejo, Directora de HiveYoung", descripcion: "Estudiante de Medicina en la UC, representante de Chile en las Olimpiadas de Matemáticas.", linkedin: "https://linkedin.com/" },
    { id: 202, nombre: "Maglio Olguin", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773016797/Generated_Image_March_08_2026_-_9_39PM_xlt5lg.png", alt: "Maglio Olguin, Director de HiveYoung", descripcion: "Estudiante de Ingeniería en la Universidad de Chile.", linkedin: "https://linkedin.com/" },
];

export const equipoGeneral: Miembro[] = [
    { id: 9, nombre: "Mateo Bartolucci", cargo: "Head of People", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773017135/Generated_Image_March_08_2026_-_9_44PM_zat1tc.png", alt: "Mateo Bartolucci, Head of People en HiveYoung", descripcion: "Estudiante del Colegio Inmaculada Concepción de Vitacura, soñando con una mejor educación para chile.", linkedin: "https://linkedin.com/" },
    { id: 305, nombre: "Ignacia Vivet", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773337625/WhatsApp_Image_2026-03-09_at_20.59.29_httwa4.jpg", alt: "Ignacia Vivet, miembro del equipo de HiveYoung", descripcion: "Estudiante escolar. Apasionada por la historia y las relaciones internacionales.", linkedin: "https://linkedin.com/" },
    { id: 303, nombre: "Javiera Cotet", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773337640/WhatsApp_Image_2026-03-09_at_20.58.33_u4pmc8.jpg", alt: "Javiera Cotet, miembro del equipo de HiveYoung", descripcion: "Estudiante Escolar del Instituto Nacional.", linkedin: "https://linkedin.com/" },
    { id: 304, nombre: "Joaquin Salas", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773086348/1772071420958_ihex7s.jpg", alt: "Joaquin Salas, miembro del equipo de HiveYoung", descripcion: "Estudiante de Derecho en la UC.", linkedin: "https://linkedin.com/" },
    { id: 306, nombre: "Vicente Diaz", cargo: "Equipo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773337628/WhatsApp_Image_2026-03-09_at_21.22.17_ii5gqx.jpg", alt: "Vicente Diaz, miembro del equipo de HiveYoung", descripcion: "Estudiante Escolar. Apasionado por el Medio Ambiente.", linkedin: "https://linkedin.com/" },
];

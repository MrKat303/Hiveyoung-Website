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
    { id: 1, nombre: "Cristian Suárez", cargo: "Presidente ejecutivo", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254971/Cristian_Suarez_HiveYoung_vwkqct.png", alt: "Cristian Suárez, cofundador y Presidente Ejecutivo de HiveYoung", descripcion: "Cofundador de HiveYoung, emprendedor, apasionado por el emprendimiento y la tecnología.", linkedin: "https://linkedin.com/" },
    { id: 4, nombre: "Alessandra Mussuto", cargo: "Directora Ejecutiva", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255012/Alessandra_Mussuto_HiveYoung_vxk1fv.png", alt: "Alessandra Mussuto, Directora Ejecutiva de HiveYoung", descripcion: "Estudiante de Ingeniería Comercial en la Universidad de Chile. Apasionada por las artes escénicas.", linkedin: "https://linkedin.com/" },
    { id: 6, nombre: "Santiago Oviedo", cargo: "Director de Ecosistema", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254973/Generated_Image_March_08_2026_-_9_48PM_gxyjsy_tgb1sv.png", alt: "Santiago Oviedo, Director de Ecosistema de HiveYoung", descripcion: "Estudiante de Ingeniería Comercial en la UC, Ex-Miembro del Centro de Estudiantes del CVD.", linkedin: "https://linkedin.com/" },
    { id: 7, nombre: "Martina Ortega", cargo: "Directora de Marketing", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254988/Martina_Ortega_roj2xl.png", alt: "Martina Ortega, Directora de Marketing de HiveYoung", descripcion: "Estudiante del Instituto Nacional, me apasiona la ciencia y participo en movimientos femeninos como Tremendas y Lumina", linkedin: "https://linkedin.com/" },
    { id: 301, nombre: "Ignacio Morales", cargo: "Director de Proyectos Sociales", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255648/Ignacio_Morales_HiveYoung_v5qstt.webp", alt: "Ignacio Morales, Director de Proyectos Sociales de HiveYoung", descripcion: "Estudiante de Derecho en la UC.", linkedin: "https://linkedin.com/" },
    { id: 101, nombre: "Clemente Pacheco", cargo: "Director de Proyectos", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254970/Clemente_Pacheco_HiveYoung_d9vvnu.png", alt: "Clemente Pacheco, Director de Proyectos de HiveYoung", descripcion: "Estudiante del Grange School.", linkedin: "https://linkedin.com/" },
];

export const coordinadoresRegionales: Miembro[] = [
    { id: 102, nombre: "María Ignacia", cargo: "Coordinadora Regional Valparaíso", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254985/Mar%C3%ADa_Ignacia_p2j5k1.png", alt: "María Ignacia, Coordinadora Regional Valparaíso de HiveYoung", descripcion: "", linkedin: "https://linkedin.com/" },
];

export const directorio: Miembro[] = [
    { id: 2, nombre: "Vicente Olguín", cargo: "Presidente", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254992/vicente_olgu%C3%ADn_t0vhva.jpg", alt: "Vicente Olguín, cofundador y Presidente de HiveYoung", descripcion: "Estudiante de Ingeniería en la UC, cofundador de HiveYoung y Mejor Orador en el II Mundial Escolar de Debate en Español.", linkedin: "https://linkedin.com/" },
    { id: 204, nombre: "Lucas Galleguillos", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254976/Lucas_u5zhlu.jpg", alt: "Lucas Galleguillos, cofundador y Director de HiveYoung", descripcion: "Cofundador de HiveYoung, apasionado por la Innovación Social.", linkedin: "https://linkedin.com/" },
    { id: 201, nombre: "Camilo Jimenez", cargo: "Secretario", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255013/Camilo_Jimenez_fshm6c.jpg", alt: "Camilo Jimenez, Secretario de HiveYoung", descripcion: "Estudiante de Historia en la Universidad de Chile, fundador del MUN Escolar.", linkedin: "https://linkedin.com/" },
    { id: 5, nombre: "Dante Espinoza", cargo: "Tesorero", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254971/Dante_Espinoza_fuekcc.jpg", alt: "Dante Espinoza, Tesorero de HiveYoung", descripcion: "Estudiante de Derecho en la UC, 2.º Mejor Orador Nacional 2023 y 2024 (debate).", linkedin: "https://linkedin.com/" },
    { id: 8, nombre: "Sofía Cornejo", cargo: "Directora", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254990/Sofia_Cornejo_zxgegq.jpg", alt: "Sofía Cornejo, Directora de HiveYoung", descripcion: "Estudiante de Medicina en la UC, representante de Chile en las Olimpiadas de Matemáticas.", linkedin: "https://linkedin.com/" },
    { id: 202, nombre: "Maglio Olguin", cargo: "Director", img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254978/Maglio_Olguin_eeesq1.png", alt: "Maglio Olguin, Director de HiveYoung", descripcion: "Estudiante de Ingeniería en la Universidad de Chile.", linkedin: "https://linkedin.com/" },
];


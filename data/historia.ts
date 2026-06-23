export interface HistoryItem {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    desc: string;
    img: string;
    alt: string;
    theme: string;
    fit?: string;
    type?: string;
    imgPosition?: string;
}

export const historyItems: HistoryItem[] = [
    {
        id: 'founders',
        year: "2024",
        title: "Donde todo comenzó",
        subtitle: "El inicio",
        desc: "Todo comenzó con tres estudiantes del Instituto Nacional: Cristian Suárez, Lucas Galleguillos y Vicente Olguín. Provenían de intereses distintos, pero compartían una misma idea: crear una plataforma que conectara a jóvenes con distintos talentos, pasiones y ganas de hacer cosas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256043/Fundadores_de_HiveYoung_ebrcgk.png",
        alt: "Fotografía de los fundadores de HiveYoung: Cristian Suárez, Lucas Galleguillos y Vicente Olguín en sus inicios.",
        theme: "dark",
        fit: "cover",
        imgPosition: "77% 25%"
    },
    {
        id: 'eventos',
        year: "2024",
        title: "Los primeros pasos",
        subtitle: "Expandiendo el horizonte",
        desc: "La idea comenzó a crecer. Compañeros se fueron sumando al proyecto y el equipo empezó a moverse: asistir a eventos, aprender, hacer networking y conocer personas. Poco a poco, HiveYoung empezaba a abrirse camino.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256083/HiveYoung_moments_qokz9x.png",
        alt: "Equipo de HiveYoung participando en actividades de networking y formación inicial.",
        theme: "light"
    },
    {
        id: 'reuniones',
        year: "2024",
        title: "Construyendo algo real",
        subtitle: "De la idea a la acción",
        desc: "Se formó un equipo y comenzaron a dar forma al primer gran proyecto: el Congreso HiveYoung. Lo que había empezado como una conversación entre amigos comenzó a transformarse en algo mucho más grande: un proyecto con propósito, valores y una visión clara para la juventud.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256556/hiveyoung_reuniones_lvlqvk.webp",
        alt: "El equipo de trabajo de HiveYoung planificando la estrategia del primer Congreso.",
        theme: "dark"
    },
    {
        id: 'congreso',
        year: "2025",
        title: "El primer gran desafío",
        subtitle: "Organización y compromiso",
        desc: "En 2025 llegó nuestro primer gran reto: organizar el Congreso HiveYoung. Fueron más de seis meses de trabajo intenso: planificación, reuniones, coordinación y muchas horas dedicadas al proyecto, incluso sacrificando tiempo de clases.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256094/Speakers_Congreso_HiveYoung_x0dgwz.jpg",
        alt: "Organizadores de HiveYoung junto a speakers destacados durante el Congreso 2025.",
        theme: "green"
    },
    {
        id: 'disfrutar',
        year: "2025",
        title: "Un punto de inflexión",
        subtitle: "Impacto masivo",
        desc: "El Congreso HiveYoung reunió a más de 2000 estudiantes y más de 30 instituciones. Lo que comenzó como una idea entre tres estudiantes se transformó en un evento capaz de movilizar a toda una comunidad y abrió paso a nuevas ideas, colaboraciones e iniciativas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256071/HiveYoung_Comunidad_dsaxga.jpg",
        alt: "Grupo masivo de voluntarios de HiveYoung celebrando el éxito del Congreso con más de 2000 asistentes.",
        theme: "light"
    },
    {
        id: 'cierre',
        year: "",
        title: "Esta historia no sería posible sin quienes creyeron en ella desde el comienzo",
        subtitle: "A quienes hicieron posible este comienzo y a quienes escribirán lo que viene.",
        desc: "",
        img: "",
        alt: "",
        theme: "dark",
        type: "text-only"
    }
];

export const galleryImages = [
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256074/HiveYoung_con_CBA_sk5hjk.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256068/HiveYoung_Summit_Pais_Digital_yi01qu.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256047/HiveYoung_Marcelo_Guital_kyn4gz.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256077/HiveYoung_en_la_radio_ggvl4o.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256106/Lanzamiento_Congreso_HiveYoung_nqfbp1.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256108/Lucas_Galleguillos_y_Vicente_Olguin_g6gtxe.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256117/HiveYoung_Banco_Estado_qpfwre.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782256160/HiveYoung_Auspiciadores_gmrizy.jpg"
];

export const galleryAlts = [
    "Equipo de HiveYoung en reunión estratégica con Cambridge Business Association (CBA)",
    "Participación de HiveYoung en el Summit de la Fundación País Digital",
    "Integrantes de HiveYoung en un encuentro con Marcelo Guital",
    "Fundadores de HiveYoung participando en una entrevista de radio para difundir el proyecto",
    "Evento oficial de lanzamiento del Congreso HiveYoung 2025 ante la comunidad",
    "Lucas Galleguillos y Vicente Olguín, directivos de HiveYoung",
    "Directiva de HiveYoung en una reunión corporativa en las oficinas de Banco Estado",
    "Stand de auspiciadores y aliados estratégicos durante el Congreso HiveYoung"
];

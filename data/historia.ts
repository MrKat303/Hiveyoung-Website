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
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769039962/Cristian_Suarez_svypim.png",
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
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773505814/20240924_115026_osmgus.png",
        alt: "Equipo de HiveYoung participando en actividades de networking y formación inicial.",
        theme: "light"
    },
    {
        id: 'reuniones',
        year: "2024",
        title: "Construyendo algo real",
        subtitle: "De la idea a la acción",
        desc: "Se formó un equipo y comenzaron a dar forma al primer gran proyecto: el Congreso HiveYoung. Lo que había empezado como una conversación entre amigos comenzó a transformarse en algo mucho más grande: un proyecto con propósito, valores y una visión clara para la juventud.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773456004/20250509_130743_oax4i7.png",
        alt: "El equipo de trabajo de HiveYoung planificando la estrategia del primer Congreso.",
        theme: "dark"
    },
    {
        id: 'congreso',
        year: "2025",
        title: "El primer gran desafío",
        subtitle: "Organización y compromiso",
        desc: "En 2025 llegó nuestro primer gran reto: organizar el Congreso HiveYoung. Fueron más de seis meses de trabajo intenso: planificación, reuniones, coordinación y muchas horas dedicadas al proyecto, incluso sacrificando tiempo de clases.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg",
        alt: "Organizadores de HiveYoung junto a speakers destacados durante el Congreso 2025.",
        theme: "green"
    },
    {
        id: 'disfrutar',
        year: "2025",
        title: "Un punto de inflexión",
        subtitle: "Impacto masivo",
        desc: "El Congreso HiveYoung reunió a más de 2000 estudiantes y más de 30 instituciones. Lo que comenzó como una idea entre tres estudiantes se transformó en un evento capaz de movilizar a toda una comunidad y abrió paso a nuevas ideas, colaboraciones e iniciativas.",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681115/WhatsApp_Image_2026-03-16_at_14.06.02_b61imy.jpg",
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
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679224/4_mshec9.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/5_pniltf.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769026522/IMG-20250328-WA0013_yd0oal.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456719/Voluntarios_sepxvr.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/8_tgves4.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/6_rjmmix.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/7_ppzkqu.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679225/1_ualneu.png",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016933/20241015_115636_yjywyl.heic",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679372/IMG-20241017-WA0040_mmmmdm.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773679377/20241015_115636_1_phuagk.heic",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681116/WhatsApp_Image_2026-03-16_at_14.06.02_1_lchn49.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773681115/WhatsApp_Image_2026-03-16_at_14.06.02_b61imy.jpg"
];

export const galleryAlts = [
    "Momentos HiveYoung: Liderazgo y comunidad juvenil",
    "Encuentros HiveYoung: Jóvenes agentes de cambio en Chile",
    "Colaboración juvenil HiveYoung: Construyendo el futuro",
    "Comunidad HiveYoung: Empoderamiento y talento",
    "Networking juvenil HiveYoung: Conectando ideas",
    "Iniciativas HiveYoung: Impacto social real",
    "Cultura HiveYoung: Innovación y propósito",
    "HiveYoung: La red de talento más activa de Latinoamérica"
];

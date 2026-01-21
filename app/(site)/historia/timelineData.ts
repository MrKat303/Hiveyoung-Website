export interface TimelineMilestone {
    id: string;
    date: string;
    title: string;
    description: string;
    side: 'left' | 'right';
    images?: {
        src: string;
        alt: string;
    }[];
}

export const timelineMilestones: TimelineMilestone[] = [
    {
        id: 'disfrutar',
        date: 'Mayo 2024',
        title: 'Disfrutar Cada Proceso',
        description: 'Desde el inicio, cada conversación, cada reunión y cada experiencia fue moldeando lo que HiveYoung empezaba a ser.',
        side: 'left',
        images: [
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016921/IMG-20250519-WA0111_yk5dze.jpg',
                alt: 'Equipo disfrutando el proceso'
            },
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769026522/IMG-20250328-WA0013_yd0oal.jpg',
                alt: 'Momentos del equipo'
            }
        ]
    },
    {
        id: 'eventos',
        date: 'Septiembre - Octubre 2024',
        title: 'Asistiendo a Eventos',
        description: 'Empezamos a asistir a eventos, a hacer networking, a construir relaciones y, por sobre todo, a disfrutar profundamente lo que hacíamos.',
        side: 'right',
        images: [
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016942/20240924_115026_osmgus.heic',
                alt: 'Evento Septiembre 2024'
            },
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016933/20241015_115636_yjywyl.heic',
                alt: 'Evento Octubre 2024'
            }
        ]
    },
    {
        id: 'reuniones',
        date: 'Finales 2024',
        title: 'Reuniones y Planificación',
        description: 'El equipo se dedicó intensamente a la gestión, la logística y cada detalle necesario para hacer realidad el primer gran proyecto.',
        side: 'left',
        images: [
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016930/20250509_130743_oax4i7.heic',
                alt: 'Reunión del equipo'
            }
        ]
    },
    {
        id: 'congreso',
        date: '7-8 Julio 2025',
        title: 'Primer Congreso',
        description: 'El Congreso de Emprendimiento e Innovación se hace realidad. Un hito que confirma que cuando los jóvenes confían en sus ideas, pueden construir cosas que realmente importan.',
        side: 'right',
        images: [
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016926/IMG_0094_1_oknzn7.jpg',
                alt: 'Congreso HiveYoung 2025'
            }
        ]
    },
    {
        id: 'creciendo',
        date: 'Hoy',
        title: 'Seguimos Creciendo',
        description: 'HiveYoung sigue creciendo, impulsado por las personas que lo conforman y por todas aquellas que se han sumado en el camino.',
        side: 'left',
        images: [
            {
                src: 'https://res.cloudinary.com/dlipwrbvd/image/upload/v1769016902/IMG-20250930-WA0098_yw5tmg.jpg',
                alt: 'Equipo actual HiveYoung'
            }
        ]
    }
];

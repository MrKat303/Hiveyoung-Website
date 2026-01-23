export interface NavLink {
    name: string;
    path: string;
    dropdown?: {
        name: string;
        path: string;
    }[];
}

export const navigationLinks: NavLink[] = [
    { name: "Inicio", path: "/" },
    {
        name: "Quienes Somos",
        path: "/somos",
        dropdown: [
            { name: "Nuestra Historia", path: "/historia" },
        ],
    },
    {
        name: "Nuestro Equipo",
        path: "/equipo",
        dropdown: [
            { name: "Advisory Board", path: "/advisory-board" },
        ],
    },
    { name: "Contacto", path: "/contacto" },
];

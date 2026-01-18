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
    { name: "¿Quiénes somos?", path: "/somos" },
    {
        name: "Equipo",
        path: "/equipo",
        dropdown: [
            { name: "Advisory Board", path: "/advisory-board" },
        ],
    },
    { name: "Proyectos", path: "/proyectos" },
    { name: "Contacto", path: "/contacto" },
];

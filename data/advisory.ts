export interface Advisor {
    id: number;
    name: string;
    role: string;
    institution: string;
    img: string;
    color: string;
}

export const advisors: Advisor[] = [
    {
        id: 1,
        name: "Gina Ocqueteau",
        role: "Presidenta / Directora",
        institution: "SQM / Enel",
        img: "/images/advisory/Gina.jpg",
        color: "purple"
    },
    {
        id: 2,
        name: "Rosario Navarro",
        role: "Presidenta",
        institution: "SOFOFA",
        img: "/images/advisory/rosario.avif",
        color: "green"
    },
    {
        id: 3,
        name: "Pablo Riccheri",
        role: "Global Managing Partner",
        institution: "Cambridge Business Association",
        img: "/images/advisory/Pablo.jpg",
        color: "yellow"
    },
    {
        id: 4,
        name: "Catherine Ruz",
        role: "Socia Directora y Fundadora",
        institution: "Grey Capital",
        img: "/images/advisory/caty.jpg",
        color: "pink"
    },
    {
        id: 5,
        name: "Fernanda Vicente",
        role: "Cofundadora y CEO",
        institution: "Money Queen",
        img: "/images/advisory/fernanda.jpg",
        color: "blue"
    }
];

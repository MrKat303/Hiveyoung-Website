export interface Advisor {
    id: number;
    name: string;
    role: string;
    institution: string;
    img: string;
    color: string;
    linkedin: string;
}

export const advisors: Advisor[] = [
    {
        id: 1,
        name: "Gina Ocqueteau",
        role: "Presidenta / Directora",
        institution: "SQM / Enel",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456574/Gina_c2nkcj.jpg",
        color: "purple",
        linkedin: "https://www.linkedin.com/in/ginaocqueteau/"
    },
    {
        id: 2,
        name: "Rosario Navarro",
        role: "Presidenta",
        institution: "SOFOFA",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456901/rosario_ef85fk.avif",
        color: "green",
        linkedin: "https://www.linkedin.com/in/rosario-navarro-betteley-08746915/"
    },
    {
        id: 3,
        name: "Pablo Riccheri",
        role: "Global Managing Partner",
        institution: "Cambridge Business Association",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456572/Pablo_se0hgf.jpg",
        color: "yellow",
        linkedin: "https://www.linkedin.com/in/pabloriccheri/"
    },
    {
        id: 4,
        name: "Catherine Ruz",
        role: "Socia Directora y Fundadora",
        institution: "Grey Capital",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456575/caty_jj8xqd.jpg",
        color: "pink",
        linkedin: "https://www.linkedin.com/in/catherine-ruz-parada-139a95139/"
    },
    {
        id: 5,
        name: "Fernanda Vicente",
        role: "Cofundadora y CEO",
        institution: "Money Queen",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456570/fernanda_szdo98.jpg",
        color: "blue",
        linkedin: "https://www.linkedin.com/in/fernandavicentem/"
    }
];

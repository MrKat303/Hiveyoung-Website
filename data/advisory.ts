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
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255002/Gina_c2nkcj_lrqg4z.jpg",
        color: "purple",
        linkedin: "https://www.linkedin.com/in/ginaocqueteau/"
    },
    {
        id: 2,
        name: "Rosario Navarro",
        role: "Presidenta",
        institution: "SOFOFA",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255009/rosario_ef85fk_bhimcf.avif",
        color: "green",
        linkedin: "https://www.linkedin.com/in/rosario-navarro-betteley-08746915/"
    },
    {
        id: 3,
        name: "Pablo Riccheri",
        role: "Global Managing Partner",
        institution: "Cambridge Business Association",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255008/Pablo_Riccheri_HiveYoung_c4zjnl.jpg",
        color: "yellow",
        linkedin: "https://www.linkedin.com/in/pabloriccheri/"
    },
    {
        id: 4,
        name: "Catherine Ruz",
        role: "Socia Directora y Fundadora",
        institution: "Grey Capital",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782254996/caty_jj8xqd_twgmqe.jpg",
        color: "pink",
        linkedin: "https://www.linkedin.com/in/catherine-ruz-parada-139a95139/"
    },
    {
        id: 5,
        name: "Fernanda Vicente",
        role: "Cofundadora y CEO",
        institution: "Money Queen",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255000/fernanda_szdo98_gwdrgq.jpg",
        color: "blue",
        linkedin: "https://www.linkedin.com/in/fernandavicentem/"
    },
    {
        id: 6,
        name: "Anne Traub",
        role: "Presidenta",
        institution: "Empresas Familiares",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255004/IMG-20251015-WA0001-e1760729547727_nol1kh_oeeyam.jpg",
        color: "purple",
        linkedin: "https://cl.linkedin.com/in/anne-traub-m%C3%B6dinger-122226188"
    }
];

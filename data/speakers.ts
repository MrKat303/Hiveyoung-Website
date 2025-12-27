export interface Speaker {
    id: number;
    name: string;
    company: string;
    role: string;
    img: string;
    tags: string[];
    category: string;
}

export const speakers: Speaker[] = [
    {
        id: 1,
        name: "Alejandra Mustakis",
        company: "IF / MEDULAR / KAUEL",
        role: "Empresaria",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766716461/Alejandra1-1024x682_kzmeyz.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 2,
        name: "Rosario Navarro",
        company: "SOFOFA",
        role: "Presidenta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676076/F7HOUZ7NLZFCTCVOQCPIWRTRAA_b6enfq.jpg",
        tags: ["Emprendimiento", "Innovación"],
        category: "Emprendimiento"
    },
    {
        id: 3,
        name: "Gina Ocqueteau",
        company: "SQM",
        role: "Presidenta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676092/Gina-Ocqueteau-Tacchini.jpeg_vve4du.jpg",
        tags: ["Liderazgo", "Innovación"],
        category: "Liderazgo"
    },
    {
        id: 4,
        name: "Marcelo Guital",
        company: "GUITAL & PARTNERS",
        role: "Empresario",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766675905/KPW2LQRDUBBABFHBLOIE3BINNQ_rwyw9i.avif",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 5,
        name: "Pablo Riccheri",
        company: "CAMBRIDGE BUSSINESS ASSOCIATION",
        role: "Global Managing Partner",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676163/Pablo_tsjrcz.jpg",
        tags: ["Liderazgo", "Emprendimiento"],
        category: "Liderazgo"
    },
    {
        id: 6,
        name: "Francisco Ackermann",
        company: "ACKERMANN PROPIEDADES",
        role: "Educador Financiero",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676191/imagen_principal-50282_gmeew5.jpg",
        tags: ["Finanzas", "Educación"],
        category: "Finanzas"
    },
    {
        id: 7,
        name: "Anil Sadarangani",
        company: "UNIVERSIDAD DE LOS ANDES",
        role: "Director de Innovación",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676200/2021_t8spud.webp",
        tags: ["Innovación", "Educación"],
        category: "Innovación"
    },
    {
        id: 8,
        name: "Fernanda Vicente",
        company: "MONEY QUEEN",
        role: "Cofundadora y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678670/Copia_de_Fernanda_Vicente_wivawt.jpg",
        tags: ["Innovación", "Emprendimiento"],
        category: "Innovación"
    },
    {
        id: 9,
        name: "Catherine Ruz",
        company: "GREY CAPITAL",
        role: "Socia Fundadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676169/caty_hf0ot0.jpg",
        tags: ["Emprendimiento", "Finanzas"],
        category: "Emprendimiento"
    },
    {
        id: 10,
        name: "Lorena Gallardo",
        company: "FUNDADORAS",
        role: "Fundadora y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766700649/DSC_5647_klke2g.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 11,
        name: "Ximena Rincón",
        company: "SENADO DE CHILE",
        role: "Senadora de la República",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676320/Ximena-Rincon-2_pwftl4.webp",
        tags: ["Liderazgo", "Educación"],
        category: "Liderazgo"
    },
    {
        id: 12,
        name: "Anne Traub",
        company: "FUNDACIÓN FAMILIAS PRIMERO",
        role: "Fundadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678937/21112024-IMG_1583_g4icde.webp",
        tags: ["Liderazgo", "Educación"],
        category: "Liderazgo"
    },
    {
        id: 13,
        name: "Fernando Venegas",
        company: "ZENIT CHILE",
        role: "Fundador y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766676343/artworks-T5BFUqFDK9qOzjvk-Hz3Fvg-t500x500_hd5eaa.jpg",
        tags: ["Emprendimiento", "Liderazgo"],
        category: "Emprendimiento"
    },
    {
        id: 14,
        name: "Natalia Lidijover",
        company: "OTIC SOFOFA",
        role: "Gerente General",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766678940/1744395504810_tcm4xj.jpg",
        tags: ["Talento", "Capital Humano"],
        category: "Innovación"
    },
    {
        id: 15,
        name: "Claudia Cornejo",
        company: "DELOITTE",
        role: "Socia Human Capital",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766701378/cl-ccornejo_ivyc1a.webp",
        tags: ["Capital Humano", "Talento"],
        category: "Innovación"
    },
    {
        id: 16,
        name: "Francisca Andler",
        company: "FA TRAINING",
        role: "Coach y Comunicadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766700609/J6A3936-scaled_yutxzf.jpg",
        tags: ["Comunicación", "Liderazgo"],
        category: "Liderazgo"
    },
    {
        id: 17,
        name: "Consuelo Urquiza",
        company: "VIRTUS PARTNERS",
        role: "Expert Advisor",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766700605/consuelo-urquiza_zjt17z.jpg",
        tags: ["Transformación Digital", "Transformación Cultural"],
        category: "Innovación"
    },
    {
        id: 18,
        name: "Sebastian Perez",
        company: "MERCADO LIBRE",
        role: "Regional Talent Acquisition",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766703680/width_400_vskvao.webp",
        tags: ["Talento", "Capital Humano"],
        category: "Innovación"
    },
    {
        id: 19,
        name: "Nicolás Behar",
        company: "RECYLINK",
        role: "CEO y cofundador",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766703571/Nicolas_Behar_pesi6s.webp",
        tags: ["Sustentabilidad", "Tecnologia"],
        category: "Innovación"
    },
    {
        id: 20,
        name: "Pablo Balzo",
        company: "UNIVERSIDAD FINIS TERRAE",
        role: "Director de Escuela de Publicidad",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766704587/pablo-balzo-director-carrera-publicidad-uft_tjluc7.jpg",
        tags: ["Publicidad", "Educación"],
        category: "Innovación"
    },
    {
        id: 21,
        name: "Polo Diaz Pinto",
        company: "WIWO",
        role: "Fundador y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766704743/1753044500808_ucnssb.jpg",
        tags: ["Tecnología", "Innovación"],
        category: "Innovación"
    },
    {
        id: 22,
        name: "Catalina Pérez",
        company: "OTROS PÉREZ",
        role: "Socia Fundadora",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705566/1667853109490_nrqypr.jpg",
        tags: ["Diseño", "Publicidad"],
        category: "Innovación"
    },
    {
        id: 23,
        name: "Ángel Morales",
        company: "UDD VENTURES",
        role: "Director Ejecutivo",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705598/20190108w15_nmv9ob.jpg",
        tags: ["Innovación", "Emprendimiento"],
        category: "Emprendimiento"
    },
    {
        id: 24,
        name: "Jocelyn Jara",
        company: "MASTERCARD",
        role: "Account Manager",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705570/1692647636035_sdfagh.jpg",
        tags: ["Finanzas"],
        category: "Finanzas"
    },
    {
        id: 25,
        name: "Antonia Guevara",
        company: "PONTIFICIA UNIVERSIDAD CATÓLICA",
        role: "Profesora Adjunta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705574/Antonia_Guevara_uodsv2.jpg",
        tags: ["Publicidad", "Educación"],
        category: "Innovación"
    },
    {
        id: 26,
        name: "Leonardo Maldonado",
        company: "GULLIVER",
        role: "Cofundador",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705851/images_d2hysg.jpg",
        tags: ["Innovación", "Tecnología"],
        category: "Innovación"
    },
    {
        id: 27,
        name: "Macarena Rojas Abalos",
        company: "ACHIPEC",
        role: "Presidenta",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705853/1681720639310_yvdlyt.jpg",
        tags: ["Ciencia", "Tecnología"],
        category: "Innovación"
    },
    {
        id: 28,
        name: "Sebastian Cifuentes",
        company: "CENIA",
        role: "Lead Machine Learning Engineer",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766705856/Sebastian-Cifuentes_zpza08.webp",
        tags: ["Tecnología", "IA"],
        category: "Innovación"
    },
    {
        id: 29,
        name: "Gabriela Prado",
        company: "THE CHANGE LAB",
        role: "Fundadora y CEO",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766715936/1689284424166_ytwi82.jpg",
        tags: ["Transformación", "Liderazgo"],
        category: "Liderazgo"
    },
    {
        id: 30,
        name: "Romina Capetillo",
        company: "",
        role: "Educadora Financiera",
        img: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766706378/divulgadora_capetillo-900x500_jszyif.jpg",
        tags: ["Finanzas", "Educación"],
        category: "Finanzas"
    }
];

export const rooms = ["Aula Magna", "Sala Cámara", "Sala Multimedia 1"];

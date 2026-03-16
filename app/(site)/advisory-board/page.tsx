import type { Metadata } from "next";
import AdvisoryBoardClient from "./AdvisoryBoardClient";

export const metadata: Metadata = {
    title: "Advisory Board",
    description:
        "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
    alternates: {
        canonical: "https://hiveyoung.org/advisory-board",
    },
    openGraph: {
        title: "Advisory Board | HiveYoung",
        description:
            "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
        images: [
            {
                url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png",
                width: 1200,
                height: 630,
                alt: "Advisory Board | HiveYoung",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Advisory Board | HiveYoung",
        description: "Conoce a los líderes estratégicos que impulsan la visión de HiveYoung.",
        images: ["https://res.cloudinary.com/dlipwrbvd/image/upload/v1773676973/OpenGraph_Pagina_wijsas.png"],
    },
};

export default function AdvisoryBoardPage() {
    return <AdvisoryBoardClient />;
}

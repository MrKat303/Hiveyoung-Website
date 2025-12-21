import type { Metadata } from "next";
import AdvisoryBoardClient from "./AdvisoryBoardClient";

export const metadata: Metadata = {
    title: "Advisory Board | HiveYoung",
    description: "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
    openGraph: {
        title: "Advisory Board | HiveYoung",
        description: "Conoce a nuestro Advisory Board: líderes estratégicos de diversas industrias que impulsan la visión y el impacto de HiveYoung.",
        url: "https://hiveyoung.cl/advisory-board",
    },
};

export default function page() {
    return <AdvisoryBoardClient />;
}

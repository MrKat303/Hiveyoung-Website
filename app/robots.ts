import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/images/home/hero.svg",
          "/images/home/bottom.svg",
          "/images/home/Colaborar.png",
          "/images/home/Articular.png",
          "/images/home/Proyectos.png",
          "/images/Draws/Captar.png",
          "/images/Draws/Asterisk.svg",
          "/images/home/Salida de tu zona de confort.svg",
          "/images/home/Generación sin barreras.svg",
          "/images/home/Proyectos con Impacto.svg",
          "/images/home/Liderazgo Con Proposito.svg",
          "/images/draws/Hablemos.png",
          "/_private/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        disallow: [
          "/images/home/hero.svg",
          "/images/home/bottom.svg",
          "/images/home/Colaborar.png",
          "/images/home/Articular.png",
          "/images/home/Proyectos.png",
          "/images/Draws/Captar.png",
          "/images/Draws/Asterisk.svg",
          "/images/home/Salida de tu zona de confort.svg",
          "/images/home/Generación sin barreras.svg",
          "/images/home/Proyectos con Impacto.svg",
          "/images/home/Liderazgo Con Proposito.svg",
          "/images/draws/Hablemos.png",
          "/_private/",
        ],
      }
    ],
    sitemap: "https://hiveyoung.org/sitemap.xml",
  };
}

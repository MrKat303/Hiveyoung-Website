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
          "/images/Draws/Asterisk.svg",
          "/_private/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        disallow: [
          "/images/home/hero.svg",
          "/images/home/bottom.svg",
          "/images/Draws/Asterisk.svg",
          "/_private/",
        ],
      }
    ],
    sitemap: "https://hiveyoung.org/sitemap.xml",
  };
}

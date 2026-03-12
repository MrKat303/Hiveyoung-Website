import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/hero.svg", "/bottom.svg"],
      },
      {
        userAgent: "Googlebot-Image",
        disallow: ["/hero.svg", "/bottom.svg"],
      }
    ],
    sitemap: "https://hiveyoung.org/sitemap.xml",
  };
}

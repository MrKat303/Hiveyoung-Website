import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/images/home/hero.svg", "/images/home/bottom.svg"],
      },
      {
        userAgent: "Googlebot-Image",
        disallow: ["/images/home/hero.svg", "/images/home/bottom.svg"],
      }
    ],
    sitemap: "https://hiveyoung.org/sitemap.xml",
  };
}

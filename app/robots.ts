import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      }
    ],
    sitemap: [
      "https://hiveyoung.org/sitemap.xml",
      "https://hiveyoung.org/sitemap-images.xml",
    ],
  };
}

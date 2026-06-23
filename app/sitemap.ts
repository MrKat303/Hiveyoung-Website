import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hiveyoung.org";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/somos`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advisory-board`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/unete`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `https://congreso.hiveyoung.org`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `https://congreso.hiveyoung.org/2025`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hiveyoung.org";
  // Usar una fecha fija reciente o la fecha de release para evitar que cambie en cada request
  const lastMod = new Date("2025-01-15");

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/somos`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advisory-board`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/unete`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://congreso.hiveyoung.org",
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

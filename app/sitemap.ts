import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hiveyoung.org";
  // Generar fecha dinámica para asegurar una actualización activa
  const lastMod = new Date();

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
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advisory-board`,
      lastModified: lastMod,
      changeFrequency: "weekly",
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
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://congreso.hiveyoung.org",
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}

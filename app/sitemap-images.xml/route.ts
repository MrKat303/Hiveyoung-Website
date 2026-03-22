import { historyItems, galleryImages, galleryAlts } from "@/data/historia";
import { direccionEjecutiva } from "@/data/equipo";

export async function GET() {
  const baseUrl = "https://hiveyoung.org";

  // Generate XML for Historia page
  const historiaImages = [
    // Main history items
    ...historyItems
      .filter(item => item.img)
      .map(item => `
    <image:image>
      <image:loc>${item.img}</image:loc>
      <image:caption>${item.alt || item.title}</image:caption>
    </image:image>`),
    // Gallery images
    ...galleryImages.map((img, i) => `
    <image:image>
      <image:loc>${img}</image:loc>
      <image:caption>${galleryAlts[i % galleryAlts.length]}</image:caption>
    </image:image>`)
  ].join("");

  // Generate XML for Equipo page (Only Dirección Ejecutiva)
  const equipoImages = direccionEjecutiva
    .filter(m => m.img)
    .map(m => `
    <image:image>
      <image:loc>${m.img}</image:loc>
      <image:caption>${m.alt || `${m.nombre} - ${m.cargo} HiveYoung`}</image:caption>
    </image:image>`)
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/historia</loc>${historiaImages}
  </url>
  <url>
    <loc>${baseUrl}/equipo</loc>${equipoImages}
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

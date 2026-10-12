import { historyItems, galleryImages, galleryAlts } from "@/data/historia";
import { direccionEjecutiva } from "@/data/equipo";
import { CONGRESS_CAROUSEL_IMAGES } from "@/data/congress-carousel";
import { MOMENTOS_IMAGES } from "@/data/congreso";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request) {
  const baseUrl = "https://www.hiveyoung.org";
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || new URL(request.url).hostname;
  const hostname = host.split(":")[0].toLowerCase();

  const historiaImages = [
    ...historyItems
      .filter((item) => item.img)
      .map(
        (item) => `
    <image:image>
      <image:loc>${escapeXml(item.img!)}</image:loc>
      <image:caption>${escapeXml(item.alt || item.title)}</image:caption>
      <image:title>${escapeXml(`${item.title} | HiveYoung`)}</image:title>
    </image:image>`
      ),
    ...galleryImages.map(
      (img, i) => `
    <image:image>
      <image:loc>${escapeXml(img)}</image:loc>
      <image:caption>${escapeXml(`${galleryAlts[i % galleryAlts.length]} - HiveYoung Momentos`)}</image:caption>
      <image:title>Galeria Historia HiveYoung ${i + 1}</image:title>
    </image:image>`
    ),
  ].join("");

  const equipoImages = direccionEjecutiva
    .filter((m) => m.img)
    .map(
      (m) => `
    <image:image>
      <image:loc>${escapeXml(m.img!)}</image:loc>
      <image:caption>${escapeXml(m.alt || `${m.nombre} - ${m.cargo} HiveYoung`)}</image:caption>
      <image:title>${escapeXml(`${m.nombre} | ${m.cargo} en HiveYoung`)}</image:title>
    </image:image>`
    )
    .join("");

  const somosData = [
    {
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255806/Comunidad_HiveYoung_oounbh.jpg",
      caption:
        "Equipo de HiveYoung en una fotografia grupal - El principal articulador del ecosistema juvenil en Chile y Latinoamerica",
      title: "Equipo HiveYoung",
    },
  ];

  const somosImages = somosData
    .map(
      (img) => `
    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
    )
    .join("");

  const uneteData = [
    {
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1782255778/Voluntarios_HiveYoung_rztrbn.jpg",
      caption:
        "Voluntarios de HiveYoung en accion en el Congreso HiveYoung 2025 celebrando el exito del evento",
      title: "Voluntarios HiveYoung",
    },
  ];

  const uneteImages = uneteData
    .map(
      (img) => `
    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
    )
    .join("");

  const homeData = CONGRESS_CAROUSEL_IMAGES.map((image, i) => ({
    url: image.url,
    caption: `Momento destacable del Congreso HiveYoung ${i + 1} - Escena en vivo`,
    title: `Congreso HiveYoung Imagen ${i + 1}`,
  }));

  const homeImages = homeData
    .map(
      (img) => `
    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
    )
    .join("");

  const momentosImages = MOMENTOS_IMAGES
    .map(
      (img, i) => `
    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:caption>${escapeXml(img.alt)}</image:caption>
      <image:title>Momento Congreso HiveYoung ${i + 1}</image:title>
    </image:image>`
    )
    .join("");

  const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>${homeImages}
  </url>
  <url>
    <loc>${baseUrl}/somos</loc>${somosImages}
  </url>
  <url>
    <loc>${baseUrl}/historia</loc>${historiaImages}
  </url>
  <url>
    <loc>${baseUrl}/equipo</loc>${equipoImages}
  </url>
  <url>
    <loc>${baseUrl}/unete</loc>${uneteImages}
  </url>
</urlset>`;

  const congressSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://congreso.hiveyoung.org/2025</loc>${momentosImages}
  </url>
</urlset>`;

  const sitemap = hostname === "congreso.hiveyoung.org"
    ? congressSitemap
    : mainSitemap;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

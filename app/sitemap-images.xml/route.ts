import { historyItems, galleryImages, galleryAlts } from "@/data/historia";
import { direccionEjecutiva } from "@/data/equipo";
import { CONGRESS_CAROUSEL_IMAGES } from "@/data/congress-carousel";

export async function GET() {
  const baseUrl = "https://hiveyoung.org";

  const historiaImages = [
    ...historyItems
      .filter((item) => item.img)
      .map(
        (item) => `
    <image:image>
      <image:loc>${encodeURI(item.img!)}</image:loc>
      <image:caption>${item.alt || item.title}</image:caption>
      <image:title>${item.title} | HiveYoung</image:title>
    </image:image>`
      ),
    ...galleryImages.map(
      (img, i) => `
    <image:image>
      <image:loc>${encodeURI(img)}</image:loc>
      <image:caption>${galleryAlts[i % galleryAlts.length]} - HiveYoung Momentos</image:caption>
      <image:title>Galeria Historia HiveYoung ${i + 1}</image:title>
    </image:image>`
    ),
  ].join("");

  const equipoImages = direccionEjecutiva
    .filter((m) => m.img)
    .map(
      (m) => `
    <image:image>
      <image:loc>${encodeURI(m.img!)}</image:loc>
      <image:caption>${m.alt || `${m.nombre} - ${m.cargo} HiveYoung`}</image:caption>
      <image:title>${m.nombre} | ${m.cargo} en HiveYoung</image:title>
    </image:image>`
    )
    .join("");

  const somosData = [
    {
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456528/grupal_1_hrhwef.jpg",
      caption:
        "Equipo de HiveYoung en una fotografia grupal - El principal articulador del ecosistema juvenil en Chile y Latinoamerica",
      title: "Equipo HiveYoung",
    },
  ];

  const somosImages = somosData
    .map(
      (img) => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`
    )
    .join("");

  const uneteData = [
    {
      url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456719/Voluntarios_sepxvr.jpg",
      caption:
        "Voluntarios de HiveYoung en accion en el Congreso HiveYoung 2025 celebrando el exito del evento",
      title: "Voluntarios HiveYoung",
    },
  ];

  const uneteImages = uneteData
    .map(
      (img) => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`
    )
    .join("");

  const homeData = CONGRESS_CAROUSEL_IMAGES.map((url, i) => ({
    url,
    caption: `Momento destacable del Congreso HiveYoung ${i + 1} - Escena en vivo`,
    title: `Congreso HiveYoung Imagen ${i + 1}`,
  }));

  const homeImages = homeData
    .map(
      (img) => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

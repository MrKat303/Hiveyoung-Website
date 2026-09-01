import { historyItems, galleryImages, galleryAlts } from "@/data/historia";
import { direccionEjecutiva } from "@/data/equipo";
import { CONGRESS_CAROUSEL_IMAGES } from "@/data/congress-carousel";
import { MOMENTOS_IMAGES } from "@/data/congreso";

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

  const homeData = CONGRESS_CAROUSEL_IMAGES.map((image, i) => ({
    url: image.url,
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

  const momentosImages = MOMENTOS_IMAGES
    .map(
      (img, i) => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.alt}</image:caption>
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

import { historyItems, galleryImages, galleryAlts } from "@/data/historia";
import { direccionEjecutiva } from "@/data/equipo";
import { CONGRESS_CAROUSEL_IMAGES } from "@/data/congress-carousel";

export async function GET() {
  const baseUrl = "https://hiveyoung.org";

  // Generate XML for Historia page
  const historiaImages = [
    // Main history items
    ...historyItems
      .filter(item => item.img)
      .map(item => `
    <image:image>
      <image:loc>${encodeURI(item.img!)}</image:loc>
      <image:caption>${item.alt || item.title}</image:caption>
      <image:title>${item.title} | HiveYoung</image:title>
    </image:image>`),
    // Gallery images
    ...galleryImages.map((img, i) => `
    <image:image>
      <image:loc>${encodeURI(img)}</image:loc>
      <image:caption>${galleryAlts[i % galleryAlts.length]} — HiveYoung Momentos</image:caption>
      <image:title>Galería Historia HiveYoung ${i + 1}</image:title>
    </image:image>`)
  ].join("");

  // Generate XML for Equipo page (Only Dirección Ejecutiva)
  const equipoImages = direccionEjecutiva
    .filter(m => m.img)
    .map(m => `
    <image:image>
      <image:loc>${encodeURI(m.img!)}</image:loc>
      <image:caption>${m.alt || `${m.nombre} - ${m.cargo} HiveYoung`}</image:caption>
      <image:title>${m.nombre} | ${m.cargo} en HiveYoung</image:title>
    </image:image>`)
    .join("");

  // Generate XML for Somos page
  const somosData = [
    { url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456528/grupal_1_hrhwef.jpg", caption: "Equipo de HiveYoung en una fotografía grupal — El principal articulador del ecosistema juvenil en Chile y Latinoamérica", title: "Equipo HiveYoung" },
    { url: `${baseUrl}/images/Draws/Pluralidad.svg`, caption: "Valor de HiveYoung: Pluralidad y respeto", title: "Pluralidad HiveYoung" },
    { url: `${baseUrl}/images/Draws/Pensamiento Libre.svg`, caption: "Valor de HiveYoung: Pensamiento Libre e innovación", title: "Pensamiento Libre HiveYoung" },
    { url: `${baseUrl}/images/Draws/Originalidad.svg`, caption: "Valor de HiveYoung: Originalidad y autenticidad", title: "Originalidad HiveYoung" },
    { url: `${baseUrl}/images/Draws/Trabajo en Equipo.svg`, caption: "Valor de HiveYoung: Trabajo en Equipo colaborativo", title: "Trabajo en Equipo HiveYoung" }
  ];
  const somosImages = somosData.map(img => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`).join("");

  // Generate XML for Unete page
  const uneteData = [
    { url: "https://res.cloudinary.com/dlipwrbvd/image/upload/v1767456719/Voluntarios_sepxvr.jpg", caption: "Voluntarios de HiveYoung en acción en el Congreso HiveYoung 2025 celebrando el éxito del evento", title: "Voluntarios HiveYoung" }
  ];
  const uneteImages = uneteData.map(img => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`).join("");

  // Generate XML for Home page
  const homeData = [
    { url: `${baseUrl}/images/home/hero.svg`, caption: "Héroe de inicio de HiveYoung - Plataforma para jóvenes líderes", title: "Inicio HiveYoung" },
    { url: `${baseUrl}/images/home/Salida de tu zona de confort.svg`, caption: "Salida de tu zona de confort con HiveYoung - Organización juvenil activa", title: "Salida Zona de Confort" },
    { url: `${baseUrl}/images/home/Generación sin barreras.svg`, caption: "Generación sin barreras impulsada por HiveYoung", title: "Generación sin Barreras" },
    { url: `${baseUrl}/images/home/Liderazgo Con Proposito.svg`, caption: "Liderazgo con Propósito a través de proyectos reales", title: "Liderazgo con Propósito" },
    { url: `${baseUrl}/images/home/Proyectos con Impacto.svg`, caption: "Proyectos con Impacto en el ecosistema juvenil", title: "Proyectos Impacto" },
    { url: `${baseUrl}/images/home/Colaborar.png`, caption: "Impulsamos la Colaboración estratégica entre jóvenes líderes", title: "Colaboración HiveYoung" },
    { url: `${baseUrl}/images/home/Articular.png`, caption: "Articulamos el Ecosistema Juvenil en Chile y Latinoamérica", title: "Articulación Juvenil" },
    { url: `${baseUrl}/images/home/Proyectos.png`, caption: "Generamos Proyectos con Impacto social real", title: "Proyectos con Propósito" },
    { url: `${baseUrl}/images/congreso/logos/CEINA.png`, caption: "Logo CEINA - Sede oficial del Congreso HiveYoung", title: "Logo CEINA" },
    ...CONGRESS_CAROUSEL_IMAGES.map((url, i) => ({ url, caption: `Momento destacable del Congreso HiveYoung ${i + 1} - Escena en vivo`, title: `Congreso HiveYoung Imagen ${i + 1}` }))
  ];
  const homeImages = homeData.map(img => `
    <image:image>
      <image:loc>${encodeURI(img.url)}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
    </image:image>`).join("");

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

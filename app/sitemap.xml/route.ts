const MAIN_URL = "https://www.hiveyoung.org";
const CONGRESS_URL = "https://congreso.hiveyoung.org";
const LAST_MODIFIED = "2026-06-23";

type SitemapEntry = {
  loc: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const mainEntries: SitemapEntry[] = [
  { loc: MAIN_URL, changeFrequency: "weekly", priority: 1 },
  { loc: `${MAIN_URL}/somos`, changeFrequency: "weekly", priority: 0.9 },
  { loc: `${MAIN_URL}/historia`, changeFrequency: "weekly", priority: 0.8 },
  { loc: `${MAIN_URL}/equipo`, changeFrequency: "weekly", priority: 0.8 },
  { loc: `${MAIN_URL}/advisory-board`, changeFrequency: "weekly", priority: 0.7 },
  { loc: `${MAIN_URL}/unete`, changeFrequency: "weekly", priority: 0.9 },
  { loc: `${MAIN_URL}/contacto`, changeFrequency: "monthly", priority: 0.6 },
];

const congressEntries: SitemapEntry[] = [
  { loc: CONGRESS_URL, changeFrequency: "monthly", priority: 1 },
  { loc: `${CONGRESS_URL}/2025`, changeFrequency: "monthly", priority: 0.9 },
];

function renderSitemap(entries: SitemapEntry[]) {
  const urls = entries
    .map(
      ({ loc, changeFrequency, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || new URL(request.url).hostname;
  const hostname = host.split(":")[0].toLowerCase();
  const entries = hostname === "congreso.hiveyoung.org" ? congressEntries : mainEntries;

  return new Response(renderSitemap(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

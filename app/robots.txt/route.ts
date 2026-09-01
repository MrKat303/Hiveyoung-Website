const MAIN_URL = "https://www.hiveyoung.org";
const CONGRESS_URL = "https://congreso.hiveyoung.org";

export async function GET(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || new URL(request.url).hostname;
  const hostname = host.split(":")[0].toLowerCase();
  const baseUrl = hostname === "congreso.hiveyoung.org" ? CONGRESS_URL : MAIN_URL;
  const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

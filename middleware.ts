import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = (forwardedHost || req.headers.get("host") || "")
    .split(",")[0]
    .trim();
  const hostname = host.split(":")[0].toLowerCase();

  // 1. Detectar si estamos en el subdominio 'congreso'
  // Funciona para: congreso.hiveyoung.org o congreso.localhost:3000
  const isCongresoSubdomain = hostname.startsWith("congreso.");

  if (isCongresoSubdomain) {
    // Si el usuario está en el subdominio 'congreso'
    // queremos mapear todas las rutas (como / o /2025) a /congreso o /congreso/2025
    if (!url.pathname.startsWith("/congreso")) {
      return NextResponse.rewrite(new URL(`/congreso${url.pathname}`, req.url));
    }

    // Prevención: Si por alguna razón el usuario intenta entrar a congreso.hiveyoung.org/congreso/...
    // lo mandamos a la ruta limpia (ej: /2025) para evitar duplicados en la URL
    if (url.pathname.startsWith("/congreso")) {
      const newPath = url.pathname.replace("/congreso", "") || "/";
      return NextResponse.redirect(new URL(newPath, req.url));
    }
  }

  // 2. Detectar si estamos en el subdominio 'brand'
  // Funciona para: brand.hiveyoung.org o brand.localhost:3000
  const isBrandSubdomain = hostname.startsWith("brand.");

  if (isBrandSubdomain) {
    // Mapear todas las rutas a /brand/*
    if (!url.pathname.startsWith("/brand")) {
      return NextResponse.rewrite(new URL(`/brand${url.pathname}`, req.url));
    }

    // Prevención de duplicados en la URL
    if (url.pathname.startsWith("/brand")) {
      const newPath = url.pathname.replace("/brand", "") || "/";
      return NextResponse.redirect(new URL(newPath, req.url));
    }
  }

  // 3. Redirección desde el dominio principal
  const isMainDomain = hostname === "hiveyoung.org" || hostname === "www.hiveyoung.org";

  // hiveyoung.org/congreso -> 301 a congreso.hiveyoung.org
  if (isMainDomain && url.pathname.startsWith("/congreso")) {
    const newPath = url.pathname.replace("/congreso", "") || "/";
    return NextResponse.redirect(new URL(`https://congreso.hiveyoung.org${newPath}`, req.url), 301);
  }

  // hiveyoung.org/brand -> 301 a brand.hiveyoung.org
  if (isMainDomain && url.pathname.startsWith("/brand")) {
    const newPath = url.pathname.replace("/brand", "") || "/";
    return NextResponse.redirect(new URL(`https://brand.hiveyoung.org${newPath}`, req.url), 301);
  }

  // Consolidar el dominio principal sin www en la URL canónica en un solo
  // redirect de aplicación, conservando la ruta y los parámetros de búsqueda.
  if (hostname === "hiveyoung.org") {
    const canonicalUrl = req.nextUrl.clone();
    canonicalUrl.protocol = "https";
    canonicalUrl.hostname = "www.hiveyoung.org";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico, favicon.png, etc. (archivos de favicon)
     * - Cualquier ruta que tenga una extensión de archivo (ej. .png, .css, .js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // 1. Detectar si estamos en el subdominio 'congreso'
  // Funciona para: congreso.hiveyoung.org o congreso.localhost:3000
  const isCongresoSubdomain = host.startsWith("congreso.");

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

  // 2. Redirección desde el dominio principal
  // Si alguien entra a hiveyoung.org/congreso -> redirección 301 a congreso.hiveyoung.org
  const isMainDomain = host === "hiveyoung.org" || host === "www.hiveyoung.org";
  if (isMainDomain && url.pathname.startsWith("/congreso")) {
    const newPath = url.pathname.replace("/congreso", "") || "/";
    return NextResponse.redirect(new URL(`https://congreso.hiveyoung.org${newPath}`, req.url), 301);
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

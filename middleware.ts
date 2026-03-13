import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // 1. Detectar si estamos en el subdominio 'congreso'
  // Funciona para: congreso.hiveyoung.org o congreso.localhost:3000
  const isCongresoSubdomain = host.startsWith("congreso.");

  if (isCongresoSubdomain) {
    // Si el usuario está en congreso.hiveyoung.org/
    // queremos que vea lo que está en /congreso pero sin que cambie la URL
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/congreso", req.url));
    }

    // Prevención: Si por alguna razón el usuario intenta entrar a congreso.hiveyoung.org/congreso
    // lo mandamos a la raíz del subdominio para evitar el duplicado
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
    "/",
    "/congreso/:path*",
  ],
};

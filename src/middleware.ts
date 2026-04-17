import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hostToSlug } from "@/generated/host-map";

/**
 * Host pubblico della richiesta (Vercel, proxy, /etc/hosts).
 * Preferisce `x-forwarded-host` (primo se è una lista) perché dietro CDN/proxy
 * `Host` può non coincidere col dominio che l’utente ha digitato.
 */
function getRequestHost(request: NextRequest): string | null {
  const raw =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");
  if (!raw) return null;
  return raw.split(":")[0]?.toLowerCase() ?? null;
}

/** `www.andreaferrari.katahero.com` → stesso slug di `andreaferrari.katahero.com` (un solo host in `site.hosts`). */
function hostForSlugLookup(host: string): string {
  if (host.startsWith("www.")) return host.slice(4);
  return host;
}

export function middleware(request: NextRequest) {
  const host = getRequestHost(request);
  if (!host) return NextResponse.next();

  const slug = hostToSlug[hostForSlugLookup(host)];
  if (!slug) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  if (/\.[a-zA-Z0-9]{2,8}$/.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

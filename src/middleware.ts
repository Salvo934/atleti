import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hostToSlug } from "@/generated/host-map";

function normalizeHost(host: string | null): string | null {
  if (!host) return null;
  return host.split(":")[0]?.toLowerCase() ?? null;
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(request.headers.get("host"));
  if (!host) return NextResponse.next();

  const slug = hostToSlug[host];
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

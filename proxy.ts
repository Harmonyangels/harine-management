import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 410 Gone — WordPress spam paths that should never have existed on this domain
  if (pathname === "/prize" || pathname.startsWith("/prize/")) {
    return new NextResponse(null, { status: 410 });
  }

  // 410 Gone — prize query-string spam (e.g. /?prize=winner, /?prize-code=abc)
  if (searchParams.has("prize")) {
    return new NextResponse(null, { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/prize", "/prize/:path*", "/"],
};

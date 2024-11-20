import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const PROTECTED_PATHS = ["/conversation", "/profile", "/favorite"]

const isProtectedPath = (path: string): boolean => {
  return PROTECTED_PATHS.some((protectedPath) => path.startsWith(protectedPath))
}

export default function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // const hasVisited = request.cookies.get("hasVisited")
  const authToken = request.cookies.get("auth-token")

  if (!authToken && isProtectedPath(pathname)) {
    const authentication = new URL("/authentication", request.url)
    authentication.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(authentication)
  }

  // if (
  //   hasVisited &&
  //   (pathname === "/" || !pathname.startsWith("/translator")) &&
  //   !isProtectedPath(pathname)
  // ) {
  //   return NextResponse.redirect(new URL("/translator", request.url))
  // }

  const response = NextResponse.next()

  // if (!hasVisited && pathname === "/translator") {
  //   response.cookies.set("hasVisited", "true", {
  //     maxAge: 30 * 24 * 60 * 60,
  //     path: "/",
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "lax"
  //   })
  // }

  return response
}

// Configure middleware matching paths
export const configPath = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, sitemap.xml (static files)
     * 6. /login (login page)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|login).*)"
  ]
}

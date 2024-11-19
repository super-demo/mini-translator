import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const PROTECTED_PATHS = ["/profile", "/favorite"]

const isProtectedPath = (path: string): boolean => {
  return PROTECTED_PATHS.some((protectedPath) => path.startsWith(protectedPath))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasVisited = request.cookies.get("hasVisited")
  const authToken = request.cookies.get("authToken")

  if (isProtectedPath(pathname)) {
    if (!authToken) {
      const signInURL = new URL("/sign-in", request.url)
      signInURL.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInURL)
    }
  }

  if (
    hasVisited &&
    !pathname.startsWith("/translator") &&
    !isProtectedPath(pathname)
  ) {
    return NextResponse.redirect(new URL("/translator", request.url))
  }

  const response = NextResponse.next()

  if (!hasVisited) {
    response.cookies.set("hasVisited", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    })
  }

  return response
}

// Configure middleware matching paths
export const config = {
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

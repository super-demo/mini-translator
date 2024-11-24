import { NextRequest, NextResponse } from "next/server"

import {
  AUTHENTICATION_ROUTE,
  PROTECTED_ROUTES,
  ROOT_ROUTE,
  TRANSLATOR_ROUTE
} from "@/constants/routes"
import { USER_SESSION, VISTED_SESSION } from "@/constants/utils"

export default function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const user = request.cookies.get(USER_SESSION)
  const visited = request.cookies.get(VISTED_SESSION)

  if (visited && pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(TRANSLATOR_ROUTE, origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (!user && PROTECTED_ROUTES.includes(pathname)) {
    const absoluteURL = new URL(AUTHENTICATION_ROUTE, origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
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
     * 6. /authentication (authentication page)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|authentication).*)"
  ]
}

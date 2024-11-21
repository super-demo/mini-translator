import { NextRequest, NextResponse } from "next/server"

// const PROTECTED_PATHS = ["/conversation", "/profile", "/favorite"]

// const isProtectedPath = (path: string): boolean =>
//   PROTECTED_PATHS.some((protectedPath) => path.startsWith(protectedPath))

// import config from "@/config"
// import { withAuth } from "next-auth/middleware"
// import { NextRequest, NextResponse } from "next/server"

// export default withAuth(
//   function middleware(req: NextRequest) {
//     if (req.nextUrl.pathname === "/") {
//       return NextResponse.redirect(new URL("/app", req.url))
//     }
//     return NextResponse.next()
//   },
//   {
//     secret: config.authSecret,
//     pages: {
//       signIn: "/authentication"
//     }
//   }
// )

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasVisited = request.cookies.get("hasVisited")
  const response = NextResponse.next()

  if (hasVisited && (pathname === "/" || !pathname.startsWith("/translator")))
    NextResponse.redirect(new URL("/translator", request.url))

  if (!hasVisited && pathname === "/translator") {
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

import NextAuth from "next-auth/next"

import AuthOptions from "@/app/api/auth/[...nextauth]/auth-options"

const Handler = NextAuth(AuthOptions())

export { Handler as GET, Handler as POST }

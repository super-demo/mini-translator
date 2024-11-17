import NextAuth from "next-auth/next"

import authOptions from "@/api/auth/[...nextauth]/auth-options"

const Handler = NextAuth(authOptions())

export { Handler as GET, Handler as POST }

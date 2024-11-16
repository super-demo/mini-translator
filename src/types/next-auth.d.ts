import { User as NextAuthUser } from "next-auth"

declare module "next-auth" {
  interface UserJWT {
    user_id: number
    access_token: string
    expires_at: number
    refresh_token: string
    refresh_token_expires_at: number
  }

  interface User extends NextAuthUser {
    jwt: UserJWT
    user_id?: number
  }

  interface Session {
    user: {
      email: string
      name: string
      avatar_url: string
      jwt: {
        user_id: number
        access_token: string
        expires_at: number
        refresh_token: string
        refresh_token_expires_at: number
      }
    }
    error?: REFRESH_TOKEN_ERROR
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
    user_id: number
    access_token: string
    expires_at: number
    refresh_token: string
    refresh_token_expires_at: number
    error?: REFRESH_TOKEN_ERROR
  }
}

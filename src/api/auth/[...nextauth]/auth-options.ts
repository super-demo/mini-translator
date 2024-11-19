import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { GoogleSignIn, RefreshToken } from "@/api/auth/actions"
import { GetUserProfile } from "@/api/user/actions"
import config from "@/config"
import JwtDecode from "@/lib/jwt-decode"

export default function AuthOptions(): NextAuthOptions {
  return {
    secret: config.authSecret,
    providers: [
      GoogleProvider({
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        authorization: { params: { access_type: "offline", prompt: "consent" } }
      })
    ],
    callbacks: {
      signIn: async ({ user, account }) => {
        if (!account?.access_token) {
          throw new Error("Failed to sign in with Google. Please try again.")
        }

        try {
          const googleSignInResponse = await GoogleSignIn({
            access_token: account.access_token
          })
          const jwtDecoded = JwtDecode({
            token: googleSignInResponse.data.access_token
          })

          if (!jwtDecoded) {
            throw new Error("Failed to decode access token. Please try again.")
          }

          const { data: userProfile } = await GetUserProfile({
            user_id: jwtDecoded.user_id,
            access_token: googleSignInResponse.data.access_token
          })

          user.jwt = {
            user_id: userProfile.user_id,
            access_token: googleSignInResponse.data.access_token,
            expires_at: googleSignInResponse.data.expires_at,
            refresh_token: googleSignInResponse.data.refresh_token,
            refresh_token_expires_at:
              googleSignInResponse.data.refresh_token_expires_at
          }
        } catch (error) {
          console.error(error)
          throw error
        }
        return true
      },

      jwt: async ({ token, user }) => {
        if (user) {
          return {
            ...token,
            user_id: user.jwt.user_id,
            access_token: user.jwt.access_token,
            expires_at: user.jwt.expires_at,
            refresh_token: user.jwt.refresh_token,
            refresh_token_expires_at: user.jwt.refresh_token_expires_at
          }
        }

        if (Date.now() < token.expires_at * 1000) {
          return token
        } else {
          try {
            const RefreshTokenResponse = await RefreshToken({
              refresh_token: token.refresh_token
            })
            return {
              ...token,
              access_token: RefreshTokenResponse.data.access_token,
              expires_at: RefreshTokenResponse.data.expires_at
            }
          } catch (error) {
            console.error(error)
            return { ...token, error: error }
          }
        }
      },

      session: async ({ session, token }) => {
        const { user_id, access_token } = token
        try {
          const { data: userData } = await GetUserProfile({
            user_id,
            access_token
          })
          session.user = {
            email: userData.email,
            name: userData.name,
            avatar_url: userData.avatar_url,
            jwt: {
              user_id,
              access_token,
              expires_at: token.expires_at,
              refresh_token: token.refresh_token,
              refresh_token_expires_at: token.refresh_token_expires_at
            }
          }
          session.error = token.error
          return session
        } catch (error) {
          console.error(error)
          return { ...session, error: error }
        }
      }
    },

    pages: {
      signIn: "/sign-in",
      error: "/sign-in"
    }
  }
}

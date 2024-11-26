import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import * as firebaseFunctions from "firebase/firestore"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import config from "@/config"
import { db } from "@/config/firebase"

export default function AuthOptions(): NextAuthOptions {
  return {
    secret: config.authSecret,
    providers: [
      GoogleProvider({
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret
      })
    ],
    adapter: FirebaseAdapter({
      ...firebaseFunctions,
      db: db
    }),
    // TODO: Implement callback functions with jwt, session
    pages: {
      signIn: "/authentication",
      error: "/authentication"
    }
  }
}

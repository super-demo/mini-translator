const config = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
  isProduction: process.env.NEXT_PUBLIC_APP_ENV === "production",
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  appSecret: process.env.NEXT_PUBLIC_APP_SECRET as string,
  authSecret: process.env.NEXTAUTH_SECRET as string
}

export default config

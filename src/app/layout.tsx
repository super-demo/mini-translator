import type { Metadata } from "next"
import localFont from "next/font/local"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteProvider } from "@/hooks/use-context"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
})

export const metadata: Metadata = {
  title: "Mini | Translator",
  description: "A simple translator app"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteProvider>
            <Header />
            {children}
            <Footer />
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

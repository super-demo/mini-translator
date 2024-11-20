"use client"

import { Lock, Mail, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"

import AlongPath from "@/components/background/along-path"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CardAuthentication() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in attempted with:", email, password)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign up attempted with:", name, email, password)
  }

  const handleGoogleAuth = () => {
    console.log("Google authentication initiated")
  }

  useEffect(() => {
    document.body.style.touchAction = "pan-y"

    const handleBlur = (e: FocusEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        setTimeout(
          () =>
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            }),
          100
        )
      }
    }

    document.addEventListener("blur", handleBlur, true)

    return () => document.removeEventListener("blur", handleBlur, true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 pb-12">
      <AlongPath />
      <div className="w-full max-w-md">
        <Card className="relative z-10 bg-background/80 backdrop-blur-md">
          <CardContent className="p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-muted-foreground">
                      Sign in to your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Sign in with Google
                  </Button>
                  <Separator />
                  <form onSubmit={handleSignIn}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="mt-6 w-full">
                      Sign In
                    </Button>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <p className="text-muted-foreground">
                      Sign up to get started
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Sign up with Google
                  </Button>
                  <Separator />
                  <form onSubmit={handleSignUp}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Usersname</Label>
                        <div className="relative">
                          <UserPlus className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="signup-username"
                            type="text"
                            placeholder="Enter your username"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a password"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="mt-6 w-full">
                      Sign Up
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

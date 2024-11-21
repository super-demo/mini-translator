"use client"

import { FormEvent, useEffect, useState } from "react"

import { GoogleButton } from "@/app/authentication/_components/google-button"
import SignInForm from "@/app/authentication/_components/signin-form"
import SignUpForm from "@/app/authentication/_components/signup-form"
import AlongPath from "@/components/background/along-path"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UseAuthContext } from "@/hooks/use-context"

export default function CardAuthentication() {
  const { SignInWithGoogle } = UseAuthContext()

  const [usersname, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function HandleGoogleSignIn() {
    try {
      await SignInWithGoogle()
    } catch (error) {
      console.error("Google sign in error:", error)
    }
  }

  function HandleSignIn(e: FormEvent) {
    e.preventDefault()
    console.log("Sign in attempted with:", email, password)
  }

  function HandleSignUp(e: FormEvent) {
    e.preventDefault()
    console.log("Sign up attempted with:", usersname, email, password)
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
                  <GoogleButton HandleGoogleSignIn={HandleGoogleSignIn} />
                  <Separator />
                  <SignInForm
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    HandleSignIn={HandleSignIn}
                  />
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
                  <GoogleButton HandleGoogleSignIn={HandleGoogleSignIn} />
                  <Separator />
                  <SignUpForm
                    username={usersname}
                    email={email}
                    password={password}
                    setUsername={setUsername}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    HandleSignUp={HandleSignUp}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { FormEvent, useEffect, useState } from "react"
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth"

import { CreateUserSession } from "@/app/api/auth/actions"
import { GoogleButton } from "@/app/authentication/_components/google-button"
import SignInForm from "@/app/authentication/_components/signin-form"
import SignUpForm from "@/app/authentication/_components/signup-form"
import AlongPath from "@/components/background/along-path"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/config/firebase"
import { SignInWithGoogle } from "@/lib/auth"

export default function CardAuthentication() {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth)
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function HandleGoogleSignIn() {
    try {
      const userUID = await SignInWithGoogle()
      if (userUID) CreateUserSession({ uid: userUID })
    } catch (error) {
      console.error("Google sign in error:", error)
    }
  }

  async function HandleSignIn(e: FormEvent) {
    e.preventDefault()

    try {
      const userID = await signInWithEmailAndPassword(email, password)
      if (userID) CreateUserSession({ uid: userID.user.uid })
    } catch (error) {
      console.error("Sign in error:", error)
    }
  }

  async function HandleSignUp(e: FormEvent) {
    e.preventDefault()

    try {
      const userID = await createUserWithEmailAndPassword(email, password)
      if (userID) CreateUserSession({ uid: userID.user.uid })
    } catch (error) {
      console.error("Sign up error:", error)
    }
  }

  function HandleToggleShowPassword() {
    setShowPassword(!showPassword)
  }

  function HandleToggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword)
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
                    showPassword={showPassword}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    HandleSignIn={HandleSignIn}
                    HandleToggleShowPassword={HandleToggleShowPassword}
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
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    HandleSignUp={HandleSignUp}
                    HandleToggleShowPassword={HandleToggleShowPassword}
                    HandleToggleShowConfirmPassword={
                      HandleToggleShowConfirmPassword
                    }
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

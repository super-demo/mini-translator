"use client"

import { FormEvent, useEffect, useState } from "react"

import {
  CreateUserSession,
  SignInWithEmail,
  SignUpWithEmail
} from "@/app/api/auth/actions"
import { GoogleButton } from "@/app/authentication/_components/google-button"
import SignInForm from "@/app/authentication/_components/signin-form"
import SignUpForm from "@/app/authentication/_components/signup-form"
import AlongPath from "@/components/background/along-path"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ACTION_FAILED_PLEASE_TRY_AGAIN } from "@/constants/errors"
import UseKeyboard from "@/hooks/use-keyboard"
import { SignInWithGoogle } from "@/lib/auth"

export default function CardAuthentication() {
  UseKeyboard()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<string>("")

  async function HandleGoogleSignIn() {
    setIsLoading(true)

    try {
      const userUID = await SignInWithGoogle()
      if (userUID) CreateUserSession({ uid: userUID })
    } catch (error) {
      setErrorMessages(
        error instanceof Error
          ? error.message
          : ACTION_FAILED_PLEASE_TRY_AGAIN("Google sign in")
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function HandleSignIn(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await SignInWithEmail({ email: email, password: password })
    } catch (error) {
      setErrorMessages(
        error instanceof Error
          ? error.message
          : ACTION_FAILED_PLEASE_TRY_AGAIN("Sign in")
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function HandleSignUp(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await SignUpWithEmail({ email: email, password: password })
    } catch (error) {
      setErrorMessages(
        error instanceof Error
          ? error.message
          : ACTION_FAILED_PLEASE_TRY_AGAIN("Sign up")
      )
    } finally {
      setIsLoading(false)
    }
  }

  function HandleToggleShowPassword() {
    setShowPassword(!showPassword)
  }

  function HandleToggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword)
  }

  useEffect(() => {
    setErrorMessages("")
  }, [confirmPassword, email, password])

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
                  <GoogleButton
                    isLoading={isLoading}
                    HandleGoogleSignIn={HandleGoogleSignIn}
                  />
                  <Separator />
                  <SignInForm
                    email={email}
                    password={password}
                    showPassword={showPassword}
                    isLoading={isLoading}
                    errorMessages={errorMessages}
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
                  <GoogleButton
                    isLoading={isLoading}
                    HandleGoogleSignIn={HandleGoogleSignIn}
                  />
                  <Separator />
                  <SignUpForm
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    isLoading={isLoading}
                    errorMessages={errorMessages}
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

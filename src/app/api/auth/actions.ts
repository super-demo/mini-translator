"use server"

import { FirebaseError } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { cookies } from "next/headers"

import {
  CreateSessionProps,
  CreateVisitedSessionProps,
  SignInWithEmailProps,
  SignUpWithEmailProps
} from "@/app/api/auth/types"
import { auth } from "@/config/firebase"
import {
  COOKIE_TIME_90_DAYS,
  USER_SESSION,
  VISTED_SESSION
} from "@/constants/utils"
import { GenerateFirebaseAuthErrorMessage } from "@/lib/generate-firebase-auth-error-message"

import { ROOT_ROUTE } from "../../../constants/routes"

export async function SignUpWithEmail(props: SignUpWithEmailProps) {
  try {
    const userID = await createUserWithEmailAndPassword(
      auth,
      props.email,
      props.password
    )
    if (userID) CreateUserSession({ uid: userID.user.uid })
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new Error(GenerateFirebaseAuthErrorMessage(error))
  }
}

export async function SignInWithEmail(props: SignInWithEmailProps) {
  try {
    const userID = await signInWithEmailAndPassword(
      auth,
      props.email,
      props.password
    )
    if (userID) CreateUserSession({ uid: userID.user.uid })
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new Error(GenerateFirebaseAuthErrorMessage(error))
  }
}

export async function CreateUserSession(props: CreateSessionProps) {
  ;(await cookies()).set(USER_SESSION, props.uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_TIME_90_DAYS,
    path: ROOT_ROUTE
  })
}

export async function RemoveUserSession() {
  ;(await cookies()).delete(USER_SESSION)
}

export async function CreateVisitedSession(props: CreateVisitedSessionProps) {
  ;(await cookies()).set(VISTED_SESSION, props.check, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_TIME_90_DAYS,
    path: ROOT_ROUTE
  })
}

export async function RemoveVisitedSession() {
  ;(await cookies()).delete(VISTED_SESSION)
}

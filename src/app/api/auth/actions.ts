"use server"

import { cookies } from "next/headers"

import {
  CreateSessionProps,
  CreateVisitedSessionProps
} from "@/app/api/auth/types"
import {
  COOKIE_TIME_90_DAYS,
  USER_SESSION,
  VISTED_SESSION
} from "@/constants/utils"

export async function CreateUserSession(props: CreateSessionProps) {
  ;(await cookies()).set(USER_SESSION, props.uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_TIME_90_DAYS,
    path: "/"
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
    path: "/"
  })
}

export async function RemoveVisitedSession() {
  ;(await cookies()).delete(VISTED_SESSION)
}

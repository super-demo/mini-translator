/**
 * @module lib/auth
 * @description
 * This module provides functions to handle user authentication.
 */

import {
  onAuthStateChanged as _onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth"

import { auth } from "@/config/firebase"

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback)
}

export async function SignInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)

    if (!result || !result.user) throw new Error("Google sign in failed")

    return result.user.uid
  } catch (error) {
    console.error("Error signing in with Google", error)
  }
}

export async function SignOut() {
  try {
    await auth.signOut()
  } catch (error) {
    console.error("Error signing out with Google", error)
  }
}

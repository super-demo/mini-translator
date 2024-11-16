"use server"

import {
  AccessTokenResponse,
  GoogleSignInProps,
  GoogleSignInResponse,
  RefreshTokenProps
} from "@/api/auth/types"
import config from "@/config"
import { USER_NOT_FOUND } from "@/constants/errors"
import FetchInstance from "@/lib/fetch-instance"
import HttpError from "@/lib/http-error"

// FYI: This function is not implemented in the snippet.
// TODO: Implement this function with firebase auth.
export async function GoogleSignIn(props: GoogleSignInProps) {
  const payload = {
    url: "/auth/login/google",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "App-Secret": config.appSecret
      },
      body: JSON.stringify(props.access_token)
    }
  }

  try {
    const response = await FetchInstance(payload)
    const result: ApiResponse<GoogleSignInResponse> = await response.json()

    if (!response.ok) {
      let errorMessage = "Failed to sign in with Google. Please try again."
      if (result.status.code === USER_NOT_FOUND.code) {
        errorMessage = USER_NOT_FOUND.message
      }
      throw new HttpError(errorMessage, result?.status.code)
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function RefreshToken(props: RefreshTokenProps) {
  const payload = {
    url: "/auth/token/refresh",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "App-Secret": config.appSecret
      },
      body: JSON.stringify(props.refresh_token)
    }
  }

  try {
    const response = await FetchInstance(payload)
    const result: ApiResponse<AccessTokenResponse> = await response.json()

    if (!response.ok) {
      throw new HttpError(result?.status.message, result?.status.code)
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

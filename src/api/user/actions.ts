"use server"

import { getServerSession } from "next-auth"

import AuthOptions from "@/api/auth/[...nextauth]/auth-options"
import { GetUserProfileProps, GetUserProfiles } from "@/api/user/types"
import { TOKEN_EXPIRED } from "@/constants/errors"
import FetchInstance from "@/lib/fetch-instance"
import HttpError from "@/lib/http-error"

// FYI: This function is not implemented in the snippet.
// TODO: Implement this function with firebase auth.
export async function GetUserProfile(props: GetUserProfileProps) {
  const payload = {
    url: `/users/${props.user_id}/profile`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.access_token}`
      }
    }
  }

  try {
    const authorizationToken =
      props.access_token ||
      (await getServerSession(AuthOptions()))?.user.jwt.access_token

    if (!authorizationToken) {
      throw new HttpError(TOKEN_EXPIRED.message, TOKEN_EXPIRED.code)
    }

    const response = await FetchInstance(payload)
    const result: ApiResponse<GetUserProfiles> = await response.json()

    if (!response.ok) {
      throw new HttpError(result?.status.message, result?.status.code)
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

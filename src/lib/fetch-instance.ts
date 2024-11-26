/**
 * @name FetchInstance
 * @param {string} url - url to fetch.
 * @returns {object} - fetch response.
 */

"use server"

import { getServerSession } from "next-auth"

import AuthOptions from "@/app/api/auth/[...nextauth]/auth-options"
import config from "@/config"

interface FetechInstanceProps {
  url: string
  options: RequestInit
}

export default async function FetchInstance(props: FetechInstanceProps) {
  const session = await getServerSession(AuthOptions())
  const accessToken = session?.user.jwt.access_token

  const defaultHeaders: HeadersInit = {
    Authorization: `Bearer ${accessToken}`
  }

  if (props.options.body instanceof FormData) {
    defaultHeaders["Content-Type"] = "multipart/form-data"
  }

  const response = await fetch(`${config.baseURL}${props.url}`, {
    ...props.options,
    headers: {
      ...defaultHeaders,
      ...props.options.headers
    }
  })

  return response
}

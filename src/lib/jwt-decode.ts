/**
 * @name JwtDecode
 * @param {string} token - jwt token.
 * @returns {object} - jwt decoded object.
 */

import { jwtDecode } from "jwt-decode"

interface JwtDecodeType {
  user_id: number
  name: string
  email: string
}

interface JwtDecodeProps {
  token: string
}

export default function JwtDecode(props: JwtDecodeProps) {
  try {
    return jwtDecode<JwtDecodeType>(props.token)
  } catch (error) {
    console.error(error)
    return null
  }
}

export interface RefreshTokenProps {
  refresh_token: string
}

export interface GoogleSignInProps {
  access_token: string
}

export interface AccessTokenResponse {
  access_token: string
  expires_at: number
}

export interface RefreshTokenResponse {
  refresh_token: string
  refresh_token_expires_at: number
}

export interface GoogleSignInResponse
  extends AccessTokenResponse,
    RefreshTokenResponse {}

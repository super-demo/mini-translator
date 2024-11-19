export interface GetUserProfileProps {
  user_id: number
  access_token?: string
}

export interface GetUserProfiles {
  user_id: number
  name: string
  email: string
  avatar_url: string
}

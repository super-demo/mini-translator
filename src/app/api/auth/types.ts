export interface SignUpWithEmailProps {
  email: string
  password: string
}

export interface SignInWithEmailProps {
  email: string
  password: string
}

export interface CreateSessionProps {
  uid: string
}

export interface CreateVisitedSessionProps {
  check: string
}

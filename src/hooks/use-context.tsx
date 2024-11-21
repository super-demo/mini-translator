"use client"

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User
} from "firebase/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import { SessionProvider } from "next-auth/react"

import { auth } from "@/config/firebase"

interface SiteContextType {
  root: AuthContextType | RefContextType
}

interface AuthContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  SignInWithGoogle: () => void
  SignOut: () => void
}

interface RefContextType {
  isInteresting: boolean
  setIsInteresting: (value: boolean) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined)
const RefContext = createContext<RefContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [isInteresting, setIsInteresting] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const root = { isInteresting, setIsInteresting }

  async function SignInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Google sign in error:", error)
      throw error
    }
  }

  async function SignOut() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  useEffect(() => {
    if (!auth) return

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUser(user)
      else if (!user) setCurrentUser(null)
    })

    return unsubscribe
  }, [])

  return (
    <SessionProvider>
      <SiteContext.Provider value={{ root }}>
        <AuthContext.Provider
          value={{ currentUser, setCurrentUser, SignInWithGoogle, SignOut }}
        >
          <RefContext.Provider value={{ isInteresting, setIsInteresting }}>
            {children}
          </RefContext.Provider>
        </AuthContext.Provider>
      </SiteContext.Provider>
    </SessionProvider>
  )
}

export function UseSiteContext() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error("UseSiteContext must be used within a SiteProvider")
  }
  return context
}

export function UseAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("UseAuthContext must be used within a SiteProvider")
  }
  return context
}

export function UseRefContext() {
  const context = useContext(RefContext)
  if (!context) {
    throw new Error("UseRefContext must be used within a SiteProvider")
  }
  return context
}

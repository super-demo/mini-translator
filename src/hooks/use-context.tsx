"use client"

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserInfo
} from "firebase/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

import { auth } from "@/config/firebase"

interface SiteContextType {
  root: AuthContextType | RefContextType
}

interface AuthContextType {
  user: UserInfo | null | undefined
  setUser: (value: UserInfo | null | undefined) => void
  GoogleSignIn: () => void
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
  const [user, setUser] = useState<UserInfo | null | undefined>()
  const [isInteresting, setIsInteresting] = useState(false)
  const root = { user, setUser, isInteresting, setIsInteresting }

  async function GoogleSignIn() {
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [user])

  return (
    <SiteContext.Provider value={{ root }}>
      <AuthContext.Provider value={{ user, setUser, GoogleSignIn, SignOut }}>
        <RefContext.Provider value={{ isInteresting, setIsInteresting }}>
          {children}
        </RefContext.Provider>
      </AuthContext.Provider>
    </SiteContext.Provider>
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

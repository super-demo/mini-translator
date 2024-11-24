"use client"

import { User } from "firebase/auth"
import { SessionProvider } from "next-auth/react"
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
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
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
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
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

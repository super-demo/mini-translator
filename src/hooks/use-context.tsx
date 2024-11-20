"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface SiteContextType {
  root: AuthContextType | RefContextType
}

interface AuthContextType {
  user: string
  setUser: (value: string) => void
}

interface RefContextType {
  isInteresting: boolean
  setIsInteresting: (value: boolean) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined)
const RefContext = createContext<RefContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>("")
  const [isInteresting, setIsInteresting] = useState(false)
  const root = { user, setUser, isInteresting, setIsInteresting }

  return (
    <SiteContext.Provider value={{ root }}>
      <AuthContext.Provider value={{ user, setUser }}>
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

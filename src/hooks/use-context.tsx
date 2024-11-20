"use client"

import { createContext, ReactNode, useContext, useState } from "react"

// Combined context type for both Header and Footer
interface SiteContextType {
  isInteresting: boolean
  setIsInteresting: (value: boolean) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [isInteresting, setIsInteresting] = useState(false)

  return (
    <SiteContext.Provider value={{ isInteresting, setIsInteresting }}>
      {children}
    </SiteContext.Provider>
  )
}

export function UseContext() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error("UseContext must be used within a SiteProvider")
  }
  return context
}

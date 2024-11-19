"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface HeaderContextType {
  isInteresting: boolean
  setIsInteresting: (value: boolean) => void
}

const SiteContext = createContext<HeaderContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [isInteresting, setIsInteresting] = useState(false)

  return (
    <SiteContext.Provider value={{ isInteresting, setIsInteresting }}>
      {children}
    </SiteContext.Provider>
  )
}

export function UseHeader() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error("UseHeader must be used within a HeaderProvider")
  }
  return context
}

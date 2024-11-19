"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface HeaderContextType {
  isInteresting: boolean
  setIsInteresting: (value: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isInteresting, setIsInteresting] = useState(false)

  return (
    <HeaderContext.Provider value={{ isInteresting, setIsInteresting }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function UseHeader() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("UseHeader must be used within a HeaderProvider")
  }
  return context
}

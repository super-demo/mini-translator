"use client"

import { useEffect } from "react"

import { UseHeader } from "@/hooks/site-provider"
import UseOnScreen from "@/hooks/use-onscreen"

export function Ref() {
  const [ref, isInteresting] = UseOnScreen({
    rootMargin: "-10px",
    threshold: 0.1
  })

  const { setIsInteresting } = UseHeader()

  useEffect(() => {
    setIsInteresting(!isInteresting)
  }, [isInteresting, setIsInteresting])

  return <div ref={ref} />
}

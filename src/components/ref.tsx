"use client"

import { useEffect } from "react"

import { UseContext } from "@/hooks/use-context"
import UseOnScreen from "@/hooks/use-onscreen"

interface RefProps {
  rootMargin?: string
  thereshold?: number
}

export function Ref(props: RefProps) {
  const [ref, isInteresting] = UseOnScreen({
    rootMargin: props.rootMargin || "0px",
    threshold: props.thereshold || 0
  })

  const { setIsInteresting } = UseContext()

  useEffect(() => {
    setIsInteresting(!isInteresting)
  }, [isInteresting, setIsInteresting])

  return <div ref={ref} />
}

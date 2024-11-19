"use client"

import { useEffect, useRef, useState } from "react"

type UseOnScreenOptions = IntersectionObserverInit

export default function UseOnScreen(
  options: UseOnScreenOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )

    const currentElement = ref.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [options])

  return [ref, isIntersecting]
}

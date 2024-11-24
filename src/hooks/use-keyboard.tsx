import { useEffect, useRef } from "react"

export default function UseKeyboard() {
  const lastInputRef = useRef<HTMLElement | null>(null)
  const isKeyboardOpenRef = useRef(false)

  useEffect(() => {
    document.body.style.touchAction = "pan-y"

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) {
        lastInputRef.current = target
        isKeyboardOpenRef.current = true
      }
    }

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (!["INPUT", "TEXTAREA"].includes(target.tagName)) {
        return
      }

      const relatedTarget = e.relatedTarget as HTMLElement
      const isSwitch =
        relatedTarget && ["INPUT", "TEXTAREA"].includes(relatedTarget.tagName)

      if (!isSwitch && isKeyboardOpenRef.current) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
          isKeyboardOpenRef.current = false
        }, 100)
      }
    }

    document.addEventListener("focus", handleFocus, true)
    document.addEventListener("blur", handleBlur, true)

    return () => {
      document.removeEventListener("focus", handleFocus, true)
      document.removeEventListener("blur", handleBlur, true)
    }
  }, [])
}

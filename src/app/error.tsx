"use client"

import { motion } from "framer-motion"
import { AlertTriangle, RotateCw } from "lucide-react"
import { useEffect } from "react"

import AlongPath from "@/components/background/along-path"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    document.body.style.touchAction = "none"
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.touchAction = ""
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <html lang="en">
      <body className="flex w-full flex-col items-center justify-center p-6 py-12 pt-8 md:px-10">
        <AlongPath />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="pt-12">
            <Card className="relative z-10 border-none bg-background/80 shadow-lg backdrop-blur-md">
              <CardContent className="pb-2 pt-6 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  className="mb-6"
                >
                  <AlertTriangle className="mx-auto h-20 w-20" />
                </motion.div>
                <h2 className="mb-2 text-2xl font-semibold">
                  Oops! Something went wrong
                </h2>
                <p className="mb-4 text-muted-foreground">
                  We&apos;re working on fixing the issue. Please try again.
                </p>
                {error.digest && (
                  <p className="font-mono text-xs text-muted-foreground">
                    Error digest: {error.digest}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={() => reset()} className="w-full">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </body>
    </html>
  )
}

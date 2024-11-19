"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Globe,
  Headphones,
  Zap
} from "lucide-react"
import { useEffect, useState } from "react"

import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface OnboardingStep {
  title: string
  description: string
  icon: React.ReactNode
  content: string
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const transition = { duration: 32, yoyo: Infinity, ease: "easeInOut" }

  const steps: OnboardingStep[] = [
    {
      title: "Instant Translation",
      description: "Communicate across languages",
      icon: <Globe className="h-12 w-12 text-primary" />,
      content:
        "Break language barriers instantly! Our translator app provides real-time translations for text, voice, and even images. Connect with people around the world effortlessly."
    },
    {
      title: "Multiple Input",
      description: "Type, speak, or capture",
      icon: <Zap className="h-12 w-12 text-primary" />,
      content:
        "Choose your preferred input method. Type text, use voice recognition for speech-to-text, or of text to translate. Our app adapts to your needs, making translation a breeze."
    },
    {
      title: "Offline Capabilities",
      description: "Translate anywhere, anytime",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      content:
        "No internet? No problem! Download language packs for offline use. Travel with confidence knowing you can translate essential phrases and words without a data connection."
    },
    {
      title: "Audio Pronunciation",
      description: "Perfect your accent",
      icon: <Headphones className="h-12 w-12 text-primary" />,
      content:
        "Hear translations spoken aloud with native pronunciation. Improve your language skills by listening and practicing. Ideal for learning correct accents and pronunciations."
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      window.location.href = "/translator"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    document.body.style.touchAction = "none"

    // make browser on laptop/desktop not scrollable
    document.body.style.overflow = "hidden"
  }, [])

  return (
    <Container className="flex-col items-center justify-center bg-cover bg-center p-4 pt-8">
      <div className="relative bg-background/80 backdrop-blur-md">
        <div className="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
            <motion.path
              d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
              fill="transparent"
              strokeWidth="12"
              stroke="currentColor"
              strokeLinecap="round"
              initial={{ pathLength: 0.001 }}
              animate={{ pathLength: 1 }}
              transition={transition}
            />
          </svg>
          <motion.div
            className="absolute left-0 top-0 h-12 w-12 rounded-lg bg-black dark:bg-white"
            style={{
              offsetPath:
                'path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")'
            }}
            initial={{ offsetDistance: "0%", scale: 2.5 }}
            animate={{ offsetDistance: "100%", scale: 1 }}
            transition={transition}
          />
        </div>
      </div>
      <div className="pt-12">
        <Card className="relative z-10 w-full max-w-3xl bg-background/80 backdrop-blur-md">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-muted-foreground">
                      {steps[currentStep].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {steps.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentStep
                            ? "bg-primary"
                            : "bg-muted-foreground/20"
                        }`}
                        animate={{
                          scale: index === currentStep ? 1.5 : 1
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
                  <motion.div
                    className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {steps[currentStep].icon}
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg leading-relaxed">
                      {steps[currentStep].content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              <Button onClick={handleNext} className="gap-2">
                {currentStep === steps.length - 1 ? "Let's go" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                This app is{" "}
                <a
                  href={"https://github.com/super-demo/mini-translator"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Mini - Translator
                </a>
                {/* . This exquisite work of code is readily accessible for
                exploration on{" "}
                <a
                  href={"https://github.com/super-demo"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                . */}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </Container>
  )
}

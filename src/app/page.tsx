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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import AlongPath from "@/components/background/along-path"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TRANSLATOR_ROUTE } from "@/constants/routes"

import { CreateVisitedSession } from "./api/auth/actions"

interface OnboardingStep {
  title: string
  description: string
  icon: React.ReactNode
  content: string
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const router = useRouter()

  const steps: OnboardingStep[] = [
    {
      title: "Instant Translation",
      description: "Communicate across languages",
      icon: <Globe className="h-12 w-12 text-primary" />,
      content: "Real-time text, voice translations. Connect globally with ease."
    },
    {
      title: "Multiple Input",
      description: "Type, speak, or capture",
      icon: <Zap className="h-12 w-12 text-primary" />,
      content:
        "Translate via typing, speaking, or capturing text. Simple and versatile."
    },
    {
      title: "Offline Capabilities",
      description: "Translate anywhere, anytime",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      content: "Download languages for offline use. Translate without internet."
    },
    {
      title: "Audio Pronunciation",
      description: "Perfect your accent",
      icon: <Headphones className="h-12 w-12 text-primary" />,
      content: "Hear native pronunciations to improve your accent and skills."
    }
  ]

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await CreateVisitedSession({ check: "true" })
      router.push(TRANSLATOR_ROUTE)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    document.body.style.touchAction = "none"
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.touchAction = ""
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <Container className="flex-col items-center justify-center p-4 pt-8">
      <AlongPath />
      <div className="pt-12">
        <Card className="relative z-10 w-full max-w-2xl bg-background/80 backdrop-blur-md">
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

        <div className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              This is{" "}
              <a
                href={"https://github.com/super-demo/mini-translator"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Mini Translator
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

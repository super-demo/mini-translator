"use client"

import { Mic } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface MicrophoneProps {
  onTranscript: (text: string) => void
  onRealTimeTranscript?: (text: string) => void
}

export function TranslatorMicrophone({
  onTranscript,
  onRealTimeTranscript
}: MicrophoneProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState<string>("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    recognitionRef.current = new window.webkitSpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    let finalTranscript = ""

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript.trim()

        if (result.isFinal) {
          finalTranscript += transcript + " "
          onTranscript(finalTranscript.trim())
        } else {
          setCurrentTranscript(transcript)
          if (onRealTimeTranscript) {
            onRealTimeTranscript(transcript)
          }
        }
      }

      // Clear previous timeout
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }

      // Set new timeout to stop recording after 1.5 seconds of silence
      speechTimeoutRef.current = setTimeout(() => {
        if (finalTranscript) {
          onTranscript(finalTranscript.trim())
          stopRecording()
        }
      }, 1500)
    }

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error)
      stopRecording()
    }

    recognitionRef.current.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setCurrentTranscript("")
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Button
      size="sm"
      variant="ghost"
      className="rounded-full hover:bg-black/5"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording && <div className="text-sm">{currentTranscript}</div>}
      <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
    </Button>
  )
}

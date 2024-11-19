"use client"

import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import { useRef, useState } from "react"

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
}

export function TranslatorMicrophone({ onTranscript }: MicrophoneProps) {
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    recognitionRef.current = new window.webkitSpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim()
      onTranscript(transcript)
      stopRecording()
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
    }
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      className="rounded-full hover:bg-black/5"
      onClick={isRecording ? stopRecording : startRecording}
    >
      <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
    </Button>
  )
}

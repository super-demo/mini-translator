"use client"

import { ArrowUpDown, Copy, Play, Star, Upload } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { GetTranslateText } from "@/app/api/translator/actions"
import { TranslateLanguagesResponse } from "@/app/api/translator/types"
import { TranslatorMicrophone } from "@/app/translator/_components/microphone-translator"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface BlockTranslatorProps {
  languagesData: TranslateLanguagesResponse
}

export default function BlockTranslator(props: BlockTranslatorProps) {
  const [inputText, setInputText] = useState<string>("")
  const [outputText, setOutputText] = useState<string>("")
  const [inputLanguage, setInputLanguage] = useState<string>("auto")
  const [outputLanguage, setOutputLanguage] = useState<string>("th")
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null)
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [isStarred, setIsStarred] = useState<boolean>(false)

  const HandleTranslate = useCallback(async () => {
    if (!inputText) return

    try {
      const response = await GetTranslateText({
        input_language: inputLanguage,
        output_language: outputLanguage,
        text: inputText
      })
      setOutputText(response)
    } catch (error) {
      console.error(error)
    }
  }, [inputText, inputLanguage, outputLanguage])

  const HandleMicrophoneTranscript = useCallback(
    (transcript: string) => {
      setInputText(transcript)
      HandleTranslate()
    },
    [setInputText, HandleTranslate]
  )

  function HandleSwapLanguages() {
    if (inputLanguage === "auto") return

    const tempLanguage = inputLanguage
    const tempText = inputText

    setInputLanguage(outputLanguage)
    setInputText(outputText)

    setOutputLanguage(tempLanguage)
    setOutputText(tempText)
  }

  function HandleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ] as const

    if (!validTypes.includes(file.type as (typeof validTypes)[number])) {
      alert("Please upload a valid file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result
      if (typeof text === "string") {
        setInputText(text)
      }
    }
    reader.readAsText(file)
  }

  function HandleCopyToClipboard() {
    if (outputText) {
      const textarea = document.createElement("textarea")
      textarea.value = outputText
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, 9999)

      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
  }

  function HandleToggleStar() {
    setIsStarred((prev) => !prev)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputText) {
        HandleTranslate()
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [inputText, HandleTranslate])

  useEffect(() => {
    if (!inputText) setOutputText("")

    const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    resizeTextarea(inputTextareaRef.current)
    resizeTextarea(outputTextareaRef.current)
  }, [inputText, outputText])

  useEffect(() => {
    document.body.style.touchAction = "pan-y"

    const handleBlur = (e: FocusEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        setTimeout(
          () =>
            window.scrollTo({
              top: 10,
              behavior: "smooth"
            }),
          100
        )
      }
    }

    document.addEventListener("blur", handleBlur, true)

    return () => document.removeEventListener("blur", handleBlur, true)
  }, [])

  return (
    <div className="mx-auto w-full space-y-4">
      <div className="rounded-2xl border shadow-sm backdrop-blur-xl">
        <div className="flex items-center justify-between border-b p-3">
          <Select
            name="input-language"
            value={inputLanguage}
            onValueChange={setInputLanguage}
          >
            <SelectTrigger className="w-[160px] border-none bg-transparent font-semibold transition-colors hover:bg-black/5">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>What us to figure it out?</SelectLabel>
                <SelectItem key="auto" value="auto">
                  Auto-Detection
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Object.entries(props.languagesData.translation).map(
                  ([code, language]) => (
                    <SelectItem key={code} value={code}>
                      {language.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={HandleSwapLanguages}
            disabled={inputLanguage === "auto"}
            className="rounded-full hover:bg-black/5"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>

          <Select
            name="output-language"
            value={outputLanguage}
            onValueChange={setOutputLanguage}
          >
            <SelectTrigger className="w-[160px] border-none bg-transparent font-semibold transition-colors hover:bg-black/5">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Object.entries(props.languagesData.translation).map(
                  ([code, language]) => (
                    <SelectItem key={code} value={code}>
                      {language.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="border-b p-4">
          <div className="relative">
            <Textarea
              ref={inputTextareaRef}
              name="input-text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                }
              }}
              placeholder="Enter text"
              className="min-h-[80px] resize-none border-none bg-transparent p-0 text-lg"
              style={{ overflow: "hidden" }}
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {inputText.length} / 5000
              </div>
              <div className="flex gap-1">
                <TranslatorMicrophone
                  onTranscript={HandleMicrophoneTranscript}
                />

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={HandleFileUpload}
                  accept=".txt,.pdf,.doc,.docx"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full hover:bg-black/5"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Textarea
              ref={outputTextareaRef}
              readOnly
              name="output-text"
              value={outputText}
              placeholder="Translation"
              className="min-h-[60px] resize-none border-none bg-transparent p-0 text-lg focus:ring-0"
              style={{ overflow: "hidden" }}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button
                disabled
                size="sm"
                variant="ghost"
                className="rounded-full hover:bg-black/5"
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full hover:bg-black/5"
                onClick={HandleCopyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                disabled
                size="sm"
                variant="ghost"
                className="rounded-full hover:bg-black/5"
                onClick={HandleToggleStar}
              >
                <Star
                  className="h-4 w-4"
                  fill={isStarred ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

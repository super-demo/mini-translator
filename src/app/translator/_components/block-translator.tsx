"use client"

import { ArrowUpDown, Download, Upload } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { GetTranslateText } from "@/api/translator/actions"
import { TranslateLanguagesResponse } from "@/api/translator/types"
import Container from "@/components/container"
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

  function HandleDownload() {
    if (!outputText) return

    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `translated-to-${outputLanguage}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputText) {
        HandleTranslate()
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [inputText, HandleTranslate])

  return (
    <Container>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Select
            name="input-language"
            value={inputLanguage}
            onValueChange={setInputLanguage}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Want us to figure it out?</SelectLabel>
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

          <Textarea
            name="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 5000))}
            placeholder="Enter text to translate..."
            className="h-32"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {inputText.length} / 5000
            </span>
            <div className="flex gap-2">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={HandleFileUpload}
                accept=".txt,.pdf,.doc,.docx"
              />
              <Button
                variant="outline"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "file-upload"
                  ) as HTMLInputElement
                  fileInput?.click()
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={HandleSwapLanguages}
            disabled={inputLanguage === "auto"}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Select
            name="output-language"
            value={outputLanguage}
            onValueChange={setOutputLanguage}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
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

          <Textarea
            readOnly
            name="output-text"
            value={outputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Translation will appear here..."
            className="h-32"
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={HandleDownload}
              disabled={!outputText}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

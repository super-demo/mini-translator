"use client"

import { ArrowUpDown } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { GetTranslateText } from "@/api/translator/actions"
import { TranslateLanguagesResponse } from "@/api/translator/types"
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

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputText) {
        HandleTranslate()
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [inputText, HandleTranslate])

  return (
    <div className="max-h-screen">
      <div className="">
        <div>
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
          />
          <span className="text-sm text-muted-foreground">
            {inputText.length} / 5000
          </span>
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

        <div>
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
          />
        </div>
      </div>
    </div>
  )
}

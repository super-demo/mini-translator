"use client"

import { TranslateLanguagesResponse } from "@/api/translator/types"

interface FormTranslatorProps {
  languagesData: TranslateLanguagesResponse
}

export default function FormTranslator(props: FormTranslatorProps) {
  return (
    <div>
      <h1>FormTranslator</h1>

      <pre>{JSON.stringify(props.languagesData, null, 2)}</pre>
    </div>
  )
}

export interface TranslateLanguagesResponse {
  translation: {
    [key: string]: {
      name: string
      nativeName: string
      dir: "ltr" | "rtl"
    }
  }
}

export interface GetTranslateTextProps {
  input_language: string
  output_language: string
  text: string
}

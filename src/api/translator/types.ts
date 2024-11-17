export interface TranslateLanguagesResponse {
  translation: {
    [key: string]: {
      name: string
      nativeName: string
      dir: "ltr" | "rtl"
    }
  }
}

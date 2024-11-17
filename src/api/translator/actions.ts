"use server"

import { TranslateLanguagesResponse } from "@/api/translator/types"
import HttpError from "@/lib/http-error"

export async function GetTranslateLanguages() {
  const payload = {
    url: "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
    next: {
      revalidate: 60 * 60 * 24
    }
  }

  try {
    const response = await fetch(payload.url, {
      next: {
        revalidate: 60 * 60 * 24
      }
    })
    const result = (await response.json()) as TranslateLanguagesResponse

    if (!response.ok) {
      throw new HttpError(
        "Failed to translate text. Please try again.",
        response.status
      )
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

"use server"

import {
  GetTranslateTextProps,
  TranslateLanguagesResponse
} from "@/api/translator/types"
import config from "@/config"
import HttpError from "@/lib/http-error"

export async function GetTranslateLanguages() {
  const payload = {
    url: config.translationsLanguagesApiBaseURL,
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

export async function GetTranslateText(props: GetTranslateTextProps) {
  const payload = {
    url: `${config.translationsTextApiBaseURL}=${props.input_language}&tl=${props.output_language}&dt=t&q=${encodeURI(props.text)}`
  }

  try {
    const response = await fetch(payload.url)
    const data = (await response.json()) as Array<Array<[string, string]>>
    const translatedText = data[0]
      .filter((item): item is [string, string] => Boolean(item[0]))
      .map((item) => item[0])
      .join("")

    if (!response.ok) {
      throw new HttpError(
        "Failed to translate text. Please try again.",
        response.status
      )
    }

    return translatedText
  } catch (error) {
    console.error(error)
    throw error
  }
}

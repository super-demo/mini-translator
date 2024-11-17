import { GetTranslateLanguages } from "@/api/translator/actions"
import FormTranslator from "@/components/translator/form-translator"

export default async function Page() {
  const [languagesData] = await Promise.all([GetTranslateLanguages()])

  return (
    <div>
      <FormTranslator languagesData={languagesData} />
    </div>
  )
}

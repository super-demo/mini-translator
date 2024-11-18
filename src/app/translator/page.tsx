import { GetTranslateLanguages } from "@/api/translator/actions"
import BlockTranslator from "@/app/translator/_components/block-translator"

export default async function Page() {
  const [languagesData] = await Promise.all([GetTranslateLanguages()])

  return (
    <div>
      <BlockTranslator languagesData={languagesData} />
    </div>
  )
}

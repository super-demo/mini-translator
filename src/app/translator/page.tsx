import { GetTranslateLanguages } from "@/api/translator/actions"
import BlockTranslator from "@/app/translator/_components/block-translator"
import Container from "@/components/container"

export default async function Page() {
  const [languagesData] = await Promise.all([GetTranslateLanguages()])

  return (
    <Container className="flex-col gap-2">
      <p className="text-3xl font-bold">Translate</p>
      <BlockTranslator languagesData={languagesData} />
    </Container>
  )
}

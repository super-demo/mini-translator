import { GetTranslateLanguages } from "@/api/translator/actions"
import BlockTranslator from "@/app/translator/_components/block-translator"
import Container from "@/components/container"

import { Ref } from "./_components/ref"

export default async function Page() {
  const [languagesData] = await Promise.all([GetTranslateLanguages()])

  return (
    <Container className="flex-col gap-2">
      <Ref />
      <p className="text-3xl font-bold">Translate</p>
      <BlockTranslator languagesData={languagesData} />
    </Container>
  )
}

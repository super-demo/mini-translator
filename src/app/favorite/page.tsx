import Container from "@/components/container"
import { Ref } from "@/components/ref"

export default function Page() {
  return (
    <Container className="flex-col gap-2">
      <Ref rootMargin="-10px" thereshold={0.1} />
      <p className="text-3xl font-bold">Favorite</p>
    </Container>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import CardAuthentication from "@/app/authentication/_components/card-authentication"
import Container from "@/components/container"
import { Ref } from "@/components/ref"
import { UseAuthContext } from "@/hooks/use-context"

export default function Page() {
  const auth = UseAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (auth?.currentUser) router.push("/translator")
  }, [auth, router])

  return (
    <Container className="flex-col gap-2">
      <Ref rootMargin="-10px" thereshold={0.1} />
      <p className="text-3xl font-bold">Authentication</p>
      <CardAuthentication />
    </Container>
  )
}

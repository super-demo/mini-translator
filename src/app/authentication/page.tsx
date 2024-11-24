"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import CardAuthentication from "@/app/authentication/_components/card-authentication"
import Container from "@/components/container"
import { Ref } from "@/components/ref"
import { TRANSLATOR_ROUTE } from "@/constants/routes"
import { UseAuthContext } from "@/hooks/use-context"

export default function Page() {
  const { currentUser } = UseAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push(TRANSLATOR_ROUTE)
  }, [currentUser, router])

  return (
    <motion.div
      initial={{ opacity: 0, y: 0.1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <Container className="flex-col gap-2">
        <Ref rootMargin="-10px" thereshold={0.1} />
        <p className="text-3xl font-bold">Authentication</p>
        <CardAuthentication />
      </Container>
    </motion.div>
  )
}

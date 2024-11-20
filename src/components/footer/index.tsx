"use client"

import { Globe, Star, UsersRound } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
        <div className="flex h-16 items-center justify-around">
          <Button variant="ghost" size="icon" className="h-12 w-12" asChild>
            <Link href={"/translator"}>
              <Globe className="h-6 w-6" />
              <span className="sr-only">Translator</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12" asChild>
            <Link href={"/conversation"}>
              <UsersRound className="h-6 w-6" />
              <span className="sr-only">Conversation</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12" asChild>
            <Link href={"/favorite"}>
              <Star className="h-6 w-6" />
              <span className="sr-only">Favorite</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

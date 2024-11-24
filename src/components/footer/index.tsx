"use client"

import { Globe, Star, UsersRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CONVERSATION_ROUTE,
  FAVORITE_ROUTE,
  TRANSLATOR_ROUTE
} from "../../constants/routes"

export default function Footer() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="flex h-16 items-center justify-around">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12",
            isActive(TRANSLATOR_ROUTE) && "bg-primary/10"
          )}
          asChild
        >
          <Link href={TRANSLATOR_ROUTE}>
            <Globe
              className={cn(
                "h-6 w-6",
                isActive(TRANSLATOR_ROUTE) && "text-primary"
              )}
            />
            <span className="sr-only">Translator</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12",
            isActive(CONVERSATION_ROUTE) && "bg-primary/10"
          )}
          asChild
        >
          <Link href={CONVERSATION_ROUTE}>
            <UsersRound
              className={cn(
                "h-6 w-6",
                isActive(CONVERSATION_ROUTE) && "text-primary"
              )}
            />
            <span className="sr-only">Conversation</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12",
            isActive(FAVORITE_ROUTE) && "bg-primary/10"
          )}
          asChild
        >
          <Link href={FAVORITE_ROUTE}>
            <Star
              className={cn(
                "h-6 w-6",
                isActive(FAVORITE_ROUTE) && "text-primary"
              )}
            />
            <span className="sr-only">Favorite</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

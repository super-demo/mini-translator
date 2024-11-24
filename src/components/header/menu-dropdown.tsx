"use client"

import { CircleEllipsis } from "lucide-react"

import { RemoveUserSession } from "@/app/api/auth/actions"
import { ThemeSwitch } from "@/components/header/theme-swtich"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { AUTHENTICATION_ROUTE } from "@/constants/routes"
import { UseAuthContext } from "@/hooks/use-context"
import { SignOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function MenuDropdown() {
  const { currentUser } = UseAuthContext()
  const router = useRouter()

  function HandleSignOut() {
    SignOut()
    RemoveUserSession()
    router.push(AUTHENTICATION_ROUTE)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full p-2 hover:bg-black/5">
          <CircleEllipsis className="h-6 w-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <ThemeSwitch />
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <p className="text-gray-300 dark:text-gray-600">Settings</p>
        </DropdownMenuItem>
        {currentUser && (
          <DropdownMenuItem onClick={HandleSignOut}>
            <p>Sign out</p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

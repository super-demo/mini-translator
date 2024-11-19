"use client"

import { CircleEllipsis } from "lucide-react"

import { ThemeSwitch } from "@/components/header/theme-swtich"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function MenuDropdown() {
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

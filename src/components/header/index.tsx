"use client"

import { usePathname } from "next/navigation"

import { MenuDropdown } from "@/components/header/menu-dropdown"
import { UseHeader } from "@/hooks/site-provider"

export default function Header() {
  const { isInteresting } = UseHeader()
  const pathname =
    usePathname().split("/")[1]?.charAt(0).toUpperCase() +
      usePathname().split("/")[1]?.slice(1) || ""

  return (
    <div className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-14 max-w-screen-2xl items-center justify-center">
        <p
          className={`absolute left-1/2 -translate-x-1/2 transform text-center font-semibold transition-all duration-300 ease-in-out ${isInteresting ? "opacity-100" : "-translate-y-2 opacity-0"}`}
        >
          {pathname}
        </p>
        <div className="absolute right-3 md:right-8">
          <MenuDropdown />
        </div>
      </div>
    </div>
  )
}

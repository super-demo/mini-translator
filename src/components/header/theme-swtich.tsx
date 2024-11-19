"use client"

import { useTheme } from "next-themes"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <Label htmlFor="appearance-mode">Appearance</Label>
      <Switch
        id="appearance-mode"
        checked={theme == "dark" ? true : false}
        onCheckedChange={() =>
          theme == "dark" ? setTheme("light") : setTheme("dark")
        }
      />
    </div>
  )
}

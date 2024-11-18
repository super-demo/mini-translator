import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container(props: ContainerProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-full items-center px-6 py-4 md:px-10",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

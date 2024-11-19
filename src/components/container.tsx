import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container(props: ContainerProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-full px-6 py-20 md:px-10",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

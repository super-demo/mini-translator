import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container(props: ContainerProps) {
  return (
    <div className={cn("flex w-full p-6 pt-12 md:px-10", props.className)}>
      {props.children}
    </div>
  )
}

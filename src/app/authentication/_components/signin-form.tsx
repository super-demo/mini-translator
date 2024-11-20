import { Label } from "@radix-ui/react-label"
import { Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignInFormProps {
  email: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  HandleSignIn: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function SignInForm(props: SignInFormProps) {
  return (
    <form onSubmit={props.HandleSignIn}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="signin-password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full">
        Sign In
      </Button>
    </form>
  )
}

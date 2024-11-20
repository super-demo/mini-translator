import { Label } from "@radix-ui/react-label"
import { Lock, Mail, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
  username: string
  email: string
  password: string
  setUsername: (value: string) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  HandleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function SignUpForm(props: SignUpFormProps) {
  return (
    <form onSubmit={props.HandleSignUp}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Usersname</Label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="signup-username"
              type="text"
              placeholder="Enter your username"
              className="pl-10"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="signup-email"
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
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              className="pl-10"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full">
        Sign Up
      </Button>
    </form>
  )
}

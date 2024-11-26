import { Label } from "@radix-ui/react-label"
import { motion } from "framer-motion"
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignInFormProps {
  email: string
  password: string
  showPassword: boolean
  isLoading: boolean
  errorMessages: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  HandleSignIn: (e: React.FormEvent<HTMLFormElement>) => void
  HandleToggleShowPassword: () => void
}

export default function SignInForm(props: SignInFormProps) {
  return (
    <form onSubmit={props.HandleSignIn}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-[10px] h-5 w-5 text-muted-foreground" />
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
            <Lock className="absolute left-3 top-[10px] h-5 w-5 text-muted-foreground" />
            <Input
              id="signin-password"
              type={props.showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-0"
              onClick={props.HandleToggleShowPassword}
            >
              {props.showPassword ? (
                <Eye className="h-5 w-5 text-muted-foreground" />
              ) : (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {props.errorMessages && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Alert variant="destructive" className="border-none">
            <AlertCircle className="h-4 w-5" />
            <AlertDescription>{props.errorMessages}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      <Button type="submit" className="mt-6 w-full">
        Sign In
      </Button>
    </form>
  )
}

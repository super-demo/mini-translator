import { Label } from "@radix-ui/react-label"
import { motion } from "framer-motion"
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
  email: string
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  isLoading: boolean
  errorMessages: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  HandleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
  HandleToggleShowPassword: () => void
  HandleToggleShowConfirmPassword: () => void
}

export default function SignUpForm(props: SignUpFormProps) {
  return (
    <form onSubmit={props.HandleSignUp}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-[10px] h-5 w-5 text-muted-foreground" />
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
            <Lock className="absolute left-3 top-[10px] h-5 w-5 text-muted-foreground" />
            <Input
              id="signup-password"
              type={props.showPassword ? "text" : "password"}
              placeholder="Create a password"
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
        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-[10px] h-5 w-5 text-muted-foreground" />
            <Input
              id="signup-confirm-password"
              type={props.showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10"
              value={props.confirmPassword}
              onChange={(e) => props.setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-0"
              onClick={props.HandleToggleShowConfirmPassword}
            >
              {props.showConfirmPassword ? (
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
        Sign Up
      </Button>
    </form>
  )
}

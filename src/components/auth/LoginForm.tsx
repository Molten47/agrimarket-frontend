import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Mail, Lock } from 'lucide-react'

interface Props {
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error:     string | null
}

export function LoginForm({ onSubmit, isLoading, error }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email" name="email" type="email"
            placeholder="you@farm.co.uk" className="pl-9 h-11" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="password" name="password" type="password"
            placeholder="••••••••" className="pl-9 h-11" required />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 font-semibold text-sm"
        style={{ backgroundColor: 'oklch(0.62 0.16 40)', color: 'oklch(0.97 0.01 85)' }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in →'}
      </Button>
    </form>
  )
}
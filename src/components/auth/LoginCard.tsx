import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { LoginForm } from './LoginForm'
import { AuthImageSlider } from './ImageSlider'

interface Props {
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error:     string | null
}

export function LoginCard({ onSubmit, isLoading, error }: Props) {
  return (
    <div className="min-h-screen flex">

      {/* Left — image slider */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
        <AuthImageSlider />
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10"
        style={{ background: 'oklch(0.97 0.018 85)' }}>
        <div className="w-full max-w-md space-y-6">

          {/* Mobile brand */}
          <div className="lg:hidden text-center">
            <h1 className="text-2xl font-bold tracking-tight">AgriMarket</h1>
            <p className="text-sm text-muted-foreground mt-1">Farm to table, directly.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your farmer account
            </p>
          </div>

          <Card className="shadow-lg border-border/60">
            <CardContent className="pt-6 pb-8 px-7">
              <LoginForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            New to AgriMarket?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Start selling today
            </Link>
          </p>
        </div>
      </div>

    </div>
  )
}
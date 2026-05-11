import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { RegisterForm } from './RegisterForm'
import { AuthImageSlider } from './ImageSlider'

interface Props {
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error:     string | null
}

export function RegisterCard({ onSubmit, isLoading, error }: Props) {
  return (
    <div className="min-h-screen flex">

      {/* Left — image slider (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
        <AuthImageSlider />
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto"
        style={{ background: 'oklch(0.97 0.018 85)' }}>
        <div className="w-full max-w-md space-y-6">

          {/* Mobile brand (hidden on desktop — slider shows it) */}
          <div className="lg:hidden text-center">
            <h1 className="text-2xl font-bold tracking-tight">AgriMarket</h1>
            <p className="text-sm text-muted-foreground mt-1">Join hundreds of UK farmers selling direct.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Free to join — no commission on your first 10 orders
            </p>
          </div>

          <Card className="shadow-lg border-border/60">
            <CardContent className="pt-6 pb-8 px-7">
              <RegisterForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </div>
  )
}
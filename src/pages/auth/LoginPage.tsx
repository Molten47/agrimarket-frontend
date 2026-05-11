import { useLogin } from '@/hooks/useLogin'
import { LoginCard } from '@/components/auth/LoginCard'
export default function LoginPage() {
  const { handleSubmit, isLoading, error } = useLogin()
  return <LoginCard onSubmit={handleSubmit} isLoading={isLoading} error={error} />
}

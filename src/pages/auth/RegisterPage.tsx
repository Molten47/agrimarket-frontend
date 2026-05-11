import { useRegister } from '@/hooks/useRegister'
import { RegisterCard } from '@/components/auth/RegisterCard'
export default function RegisterPage() {
  const { handleSubmit, isLoading, error } = useRegister()
  return <RegisterCard onSubmit={handleSubmit} isLoading={isLoading} error={error} />
}

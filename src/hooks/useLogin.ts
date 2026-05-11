import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/auth.store'

export function useLogin() {
  const [error, setError] = useState<string | null>(null)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ farmer, tokens }) => {
      setAuth(farmer, tokens.access_token, tokens.refresh_token)
      toast.success(`Welcome back, ${farmer.farm_name}`)
      navigate('/dashboard')
    },
    onError: () => {
      setError('Invalid email or password')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = new FormData(e.currentTarget)
    mutation.mutate({
      email:    form.get('email') as string,
      password: form.get('password') as string,
    })
  }

  return {
    handleSubmit,
    isLoading: mutation.isPending,
    error,
  }
}
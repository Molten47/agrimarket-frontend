import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/auth.store'

export function useRegister() {
  const [error, setError] = useState<string | null>(null)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: ({ farmer, tokens }) => {
      setAuth(farmer, tokens.access_token, tokens.refresh_token)
      toast.success(`Welcome to AgriMarket, ${farmer.farm_name}!`)
      navigate('/dashboard')
    },
    onError: (err: any) => {
      setError(err?.response?.data?.error ?? 'Registration failed')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = new FormData(e.currentTarget)
    mutation.mutate({
      email:     form.get('email') as string,
      password:  form.get('password') as string,
      full_name: form.get('full_name') as string,
      farm_name: form.get('farm_name') as string,
      county:    form.get('county') as string,
      postcode:  form.get('postcode') as string,
      bio:       form.get('bio') as string || undefined,
    })
  }

  return {
    handleSubmit,
    isLoading: mutation.isPending,
    error,
  }
}
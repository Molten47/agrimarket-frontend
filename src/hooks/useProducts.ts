import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productsApi } from '@/api/products.api'
import { categoriesApi } from '@/api/categories.api'
import { useAuthStore } from '@/store/auth.store'
import { CreateProductInput } from '@/types'

export function useProducts() {
  const queryClient = useQueryClient()
  const farmer = useAuthStore((s) => s.farmer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editSlug, setEditSlug] = useState<string | null>(null)

  const productsQuery = useQuery({
    queryKey: ['products', { farmer_id: farmer?.id }],
    queryFn:  () => productsApi.list({ per_page: 100 }),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn:  () => categoriesApi.list(),
    staleTime: 1000 * 60 * 10,
  })

  const createMutation = useMutation({
    mutationFn: (input: CreateProductInput) => productsApi.create(input),
    onSuccess: () => {
      toast.success('Product created')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setIsFormOpen(false)
    },
    onError: () => toast.error('Failed to create product'),
  })

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => productsApi.delete(slug),
    onSuccess: () => {
      toast.success('Product removed')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => toast.error('Failed to remove product'),
  })

  return {
    products:   productsQuery.data?.data ?? [],
    categories: categoriesQuery.data ?? [],
    isLoading:  productsQuery.isLoading,
    isFormOpen,
    editSlug,
    setIsFormOpen,
    setEditSlug,
    onCreate:   createMutation.mutate,
    onDelete:   deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
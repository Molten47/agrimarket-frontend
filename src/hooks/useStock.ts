import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { stockApi } from '@/api/stock.api'

export function useStock() {
  const queryClient = useQueryClient()
  const [editingSlug, setEditingSlug] = useState<string | null>(null)

  const stockQuery = useQuery({
    queryKey: ['stock'],
    queryFn:  () => stockApi.list(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ slug, input }: {
      slug:  string
      input: { quantity_available?: number; low_stock_threshold?: number }
    }) => stockApi.update(slug, input),
    onSuccess: () => {
      toast.success('Stock updated')
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      setEditingSlug(null)
    },
    onError: () => toast.error('Failed to update stock'),
  })

  return {
    stocks:       stockQuery.data?.data ?? [],
    summary:      stockQuery.data?.summary,
    isLoading:    stockQuery.isLoading,
    editingSlug,
    setEditingSlug,
    onUpdate:     updateMutation.mutate,
    isUpdating:   updateMutation.isPending,
  }
}

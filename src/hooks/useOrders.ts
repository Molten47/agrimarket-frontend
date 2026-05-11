import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ordersApi } from '@/api/orders.api'

export function useOrders() {
  const queryClient = useQueryClient()
  const [page, setPage]               = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | undefined>()

  // Filtered query for the list
  const ordersQuery = useQuery({
    queryKey: ['orders', { page, statusFilter }],
    queryFn:  () => ordersApi.list({ page, per_page: 20, order_status: statusFilter }),
  })

  // Unfiltered query just for the real total count
  const totalQuery = useQuery({
    queryKey: ['orders', 'total'],
    queryFn:  () => ordersApi.list({ page: 1, per_page: 1 }),
    staleTime: 30_000,
  })

  const updateMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      ordersApi.updateStatus(orderId, status),
    onSuccess: () => {
      toast.success('Order status updated')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: () => toast.error('Failed to update order'),
  })

  return {
    orders:         ordersQuery.data?.data       ?? [],
    total:          totalQuery.data?.total        ?? ordersQuery.data?.total ?? 0,
    totalPages:     ordersQuery.data?.total_pages ?? 1,
    isLoading:      ordersQuery.isLoading,
    page,
    statusFilter,
    setPage,
    setStatusFilter,
    onUpdateStatus: updateMutation.mutate,
    isUpdating:     updateMutation.isPending,
  }
}
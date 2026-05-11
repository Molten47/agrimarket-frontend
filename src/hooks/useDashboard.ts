import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { stockApi } from '@/api/stock.api'
import { ordersApi } from '@/api/orders.api'

export function useDashboard() {
  const farmer = useAuthStore((s) => s.farmer)

  const stockQuery = useQuery({
    queryKey: ['stock'],
    queryFn:  () => stockApi.list(),
  })

  const ordersQuery = useQuery({
    queryKey: ['orders', { page: 1, per_page: 5 }],
    queryFn:  () => ordersApi.list({ page: 1, per_page: 5 }),
  })

  return {
    farmer,
    summary:       stockQuery.data?.summary,
    recentOrders:  ordersQuery.data?.data ?? [],
    isLoadingStock:  stockQuery.isLoading,
    isLoadingOrders: ordersQuery.isLoading,
  }
}
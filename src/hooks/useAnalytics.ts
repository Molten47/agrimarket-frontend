import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { analyticsApi, Period } from '@/api/analytics.api'

export function useAnalytics() {
  const [period, setPeriod] = useState<Period>('30d')

  const summary   = useQuery({ queryKey: ['analytics', 'summary',   period], queryFn: () => analyticsApi.summary(period) })
  const revenue   = useQuery({ queryKey: ['analytics', 'revenue',   period], queryFn: () => analyticsApi.revenue(period) })
  const stock     = useQuery({ queryKey: ['analytics', 'stock'],              queryFn: () => analyticsApi.stock() })
  const customers = useQuery({ queryKey: ['analytics', 'customers', period], queryFn: () => analyticsApi.customers(period) })

  return { period, setPeriod, summary, revenue, stock, customers }
}
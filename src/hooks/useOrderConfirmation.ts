import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '@/api/orders.api'

export function useOrderConfirmation() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const orderKey = searchParams.get('key') ?? ''

  const orderQuery = useQuery({
    queryKey: ['order', id, orderKey],
    queryFn:  () => ordersApi.get(id!, orderKey),
    enabled:  !!id && !!orderKey,
  })

  return {
    order:     orderQuery.data,
    isLoading: orderQuery.isLoading,
    isError:   orderQuery.isError,
    orderKey,
  }
}
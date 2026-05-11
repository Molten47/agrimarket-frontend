import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { trackingApi } from '@/api/tracking.api'

export function useOrderTracking() {
  const { id }         = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const orderKey       = searchParams.get('key') ?? ''

  const query = useQuery({
    queryKey:        ['tracking', id, orderKey],
    queryFn:         () => trackingApi.get(id!, orderKey),
    enabled:         !!id && !!orderKey,
    refetchInterval: 30_000, // poll every 30s for live updates
  })

  return {
    events:    query.data ?? [],
    isLoading: query.isLoading,
    isError:   query.isError,
    orderId:   id ?? '',
    orderKey,
  }
}
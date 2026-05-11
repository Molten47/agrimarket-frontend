import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/config/api'

export interface Notification {
  id:          string
  event_type:  string
  payload:     Record<string, unknown>
  is_sent:     boolean
  created_at:  string
  order_id:    string | null
}

async function fetchNotifications(): Promise<Notification[]> {
  const { data } = await api.get('/notifications?per_page=20')
  return data.data ?? []
}

export function useNotifications() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey:  ['notifications'],
    queryFn:   fetchNotifications,
    refetchInterval: 30_000, // poll every 30s until WebSocket is wired
  })

  const markRead = useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}`),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const notifications = query.data ?? []
  const unreadCount   = notifications.filter((n) => !n.is_sent).length

  return {
    notifications,
    unreadCount,
    isLoading: query.isLoading,
    markRead:  markRead.mutate,
  }
}
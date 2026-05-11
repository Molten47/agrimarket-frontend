import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'

export interface WsEvent {
  event_type: string
  farmer_id:  string | null
  payload:    Record<string, unknown>
}

const HTTP_BASE = import.meta.env.VITE_API_URL as string ?? 'http://localhost:8081/api/v1'
const WS_BASE   = HTTP_BASE.replace(/\/api\/v1$/, '').replace(/^http/, 'ws')

export function useWebSocket() {
  const queryClient = useQueryClient()
  const farmer      = useAuthStore((s) => s.farmer)
  const socketRef   = useRef<WebSocket | null>(null)
  const retryRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!farmer?.id) return

    function connect() {
      const url = `${WS_BASE}/ws?farmer_id=${farmer!.id}`
      const ws  = new WebSocket(url)
      socketRef.current = ws

      ws.onopen = () => console.info('[WS] connected')

      ws.onmessage = (e: MessageEvent) => {
        try {
          const event: WsEvent = JSON.parse(e.data as string)
          handleEvent(event, queryClient)
        } catch { /* ignore malformed frames */ }
      }

      ws.onclose = () => {
        console.info('[WS] disconnected — retrying in 5s')
        retryRef.current = setTimeout(connect, 5_000)
      }

      ws.onerror = () => ws.close()
    }

    connect()

    return () => {
      if (retryRef.current) clearTimeout(retryRef.current)
      socketRef.current?.close()
    }
  }, [farmer?.id, queryClient])
}

function handleEvent(
  event:       WsEvent,
  queryClient: ReturnType<typeof useQueryClient>,
) {
  switch (event.event_type) {
    case 'order_placed':
    case 'order_confirmed':
    case 'order_cancelled':
    case 'order_dispatched':
    case 'order_delivered':
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      break
    case 'stock_low':
    case 'stock_out':
    case 'stock_added':
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      break
    case 'payment_received':
    case 'payment_failed':
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      break
    default:
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
  }
}
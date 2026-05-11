export function notificationLabel(event_type: string): string {
  const map: Record<string, string> = {
    order_placed:       'New order received',
    order_confirmed:    'Order confirmed',
    order_dispatched:   'Order dispatched',
    order_delivered:    'Order delivered',
    order_cancelled:    'Order cancelled',
    payment_received:   'Payment received',
    payment_failed:     'Payment failed',
    stock_low:          'Stock running low',
    stock_out:          'Product out of stock',
    stock_added:        'Stock updated',
  }
  return map[event_type] ?? event_type.replace(/_/g, ' ')
}

export function notificationIcon(event_type: string): string {
  if (event_type.startsWith('order'))   return '📦'
  if (event_type.startsWith('payment')) return '💳'
  if (event_type.startsWith('stock'))   return '🌾'
  return '🔔'
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
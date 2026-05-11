import { Order } from '@/types'
import { OrderRow } from './OrderRow'

interface Props {
  orders:     Order[]
  isLoading:  boolean
  isUpdating: boolean
  onUpdate:   (orderId: string, status: string) => void
}

export function OrdersList({ orders, isLoading, isUpdating, onUpdate }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No orders found.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <OrderRow
          key={o.id}
          order={o}
          isUpdating={isUpdating}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
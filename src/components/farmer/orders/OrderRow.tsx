import { Order } from '@/types'
import { OrderStatusBadge } from './OrderStatusBadge'
import { OrderStatusSelect } from './OrderStatusSelect'

interface Props {
  order:      Order
  isUpdating: boolean
  onUpdate:   (orderId: string, status: string) => void
}

function formatGbp(value: string | number | null | undefined): string {
  const num = Number(value)
  if (isNaN(num)) return '—'
  return `£${num.toFixed(2)}`
}

export function OrderRow({ order, isUpdating, onUpdate }: Props) {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="space-y-1">
        <p className="font-medium text-sm">{order.guest_email}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(order.placed_at).toLocaleDateString('en-GB')} ·{' '}
          Order #{order.order_key.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-bold text-sm">
          {formatGbp(order.total_gbp ?? order.total_amount_gbp)}
        </span>
        <OrderStatusBadge status={order.order_status} />
        <OrderStatusSelect
          orderId={order.id}
          current={order.order_status}
          isUpdating={isUpdating}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  )
}
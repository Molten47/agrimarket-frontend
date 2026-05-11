import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/types'

interface Props {
  status: OrderStatus
}

const statusColor: Record<OrderStatus, string> = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  dispatched: 'bg-indigo-100 text-indigo-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
}

export function OrderStatusBadge({ status }: Props) {
  return (
    <Badge className={statusColor[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
import { Order } from '@/types'
import { OrdersHeader } from './OrdersHeader'
import { OrdersList } from './OrdersList'
import { OrdersPagination } from './OrdersPagination'

interface Props {
  orders:         Order[]
  total:          number
  totalPages:     number
  page:           number
  isLoading:      boolean
  isUpdating:     boolean
  onStatusFilter: (v: string | undefined) => void
  onUpdate:       (orderId: string, status: string) => void
  onPage:         (page: number) => void
}

export function OrdersView({
  orders, total, totalPages, page,
  isLoading, isUpdating,
  onStatusFilter, onUpdate, onPage,
}: Props) {
  return (
    <div>
      <OrdersHeader total={total} onStatusFilter={onStatusFilter} />
      <OrdersList
        orders={orders}
        isLoading={isLoading}
        isUpdating={isUpdating}
        onUpdate={onUpdate}
      />
      <OrdersPagination
        page={page}
        totalPages={totalPages}
        onPage={onPage}
      />
    </div>
  )
}
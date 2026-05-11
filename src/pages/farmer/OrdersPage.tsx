import { useOrders } from '@/hooks/useOrders'
import { OrdersView } from '@/components/farmer/orders/OrdersView'
export default function OrdersPage() {
  const { orders, total, totalPages, page, isLoading, isUpdating, setPage, setStatusFilter, onUpdateStatus } = useOrders()
  return (
    <OrdersView
      orders={orders} total={total} totalPages={totalPages} page={page}
      isLoading={isLoading} isUpdating={isUpdating}
      onStatusFilter={setStatusFilter}
      onUpdate={(id, status) => onUpdateStatus({ orderId: id, status })}
      onPage={setPage}
    />
  )
}

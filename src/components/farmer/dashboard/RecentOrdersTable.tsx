import { Order } from '@/types'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  orders:    Order[]
  isLoading: boolean
}

function formatGbp(value: string | number | null | undefined): string {
  const num = Number(value)
  return isNaN(num) ? '—' : `£${num.toFixed(2)}`
}

const statusStyle: Record<string, React.CSSProperties> = {
  pending:    { background: '#fef3c7', color: '#92400e' },
  confirmed:  { background: '#dbeafe', color: '#1e40af' },
  processing: { background: '#ede9fe', color: '#5b21b6' },
  dispatched: { background: '#e0e7ff', color: '#3730a3' },
  delivered:  { background: '#dcfce7', color: '#166534' },
  cancelled:  { background: '#fee2e2', color: '#991b1b' },
}

export function RecentOrdersTable({ orders, isLoading }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
        <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
        <Link to="/dashboard/orders">
          <Button variant="ghost" size="sm" className="text-xs h-7">View all →</Button>
        </Link>
      </CardHeader>

      {isLoading ? (
        <div className="px-5 pb-4 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8 pb-6">No orders yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#f5f0e8', borderTop: '1px solid #e8e0d0' }}>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Customer</th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Date</th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-muted-foreground">Amount</th>
              <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                style={{ background: i % 2 === 0 ? 'transparent' : '#faf7f2' }}
                className="border-t border-border/40 hover:bg-muted/40 transition-colors"
              >
                <td className="px-5 py-3 font-medium truncate max-w-[180px]">{order.guest_email}</td>
                <td className="px-3 py-3 text-muted-foreground text-xs">
                  {new Date(order.placed_at).toLocaleDateString('en-GB')}
                </td>
                <td className="px-3 py-3 text-right font-semibold">
                  {formatGbp(order.total_gbp ?? order.total_amount_gbp)}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={statusStyle[order.order_status] ?? { background: '#f3f4f6', color: '#374151' }}
                  >
                    {order.order_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  )
}
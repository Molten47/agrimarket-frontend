import { OrderItem } from '@/types'
import { Separator } from '@/components/ui/separator'

interface Props {
  items:    OrderItem[]
  totalGbp: string
}

function safeMoney(val: string | number | undefined | null): string {
  const n = Number(val)
  return isNaN(n) ? '—' : `£${n.toFixed(2)}`
}

export function ConfirmationItemList({ items, totalGbp }: Props) {
  return (
    <div className="rounded-xl border p-5 space-y-4">
      <h2 className="font-semibold text-sm">Items Ordered</h2>
      <Separator />

      <div className="space-y-3">
        {items.map((item) => {
          const lineTotal = item.line_total_gbp ?? (item as any).subtotal_gbp
          return (
            <div key={item.product_id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.product_name}{' '}
                <span className="text-xs">× {Number(item.quantity).toFixed(3)}</span>
              </span>
              <span className="font-medium">{safeMoney(lineTotal)}</span>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="flex justify-between font-bold text-sm">
        <span>Total Paid</span>
        <span>{safeMoney(totalGbp)}</span>
      </div>
    </div>
  )
}
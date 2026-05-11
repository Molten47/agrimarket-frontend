import { Cart } from '@/types'
import { Separator } from '@/components/ui/separator'

interface Props {
  cart: Cart | null
}

export function CheckoutOrderSummary({ cart }: Props) {
  if (!cart) return null

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold text-sm">Order Summary</h2>
      <Separator />

      <div className="space-y-3">
        {cart.items.map((item) => (
          <div key={item.product_id} className="flex justify-between text-sm">
            <span className="text-muted-foreground truncate pr-4">
              {item.product_name}{' '}
              <span className="text-xs">×{item.quantity}</span>
            </span>
            <span className="font-medium flex-shrink-0">
              £{Number(item.line_total).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>£{Number(cart.total).toFixed(2)}</span>
      </div>

      <p className="text-xs text-muted-foreground">
        Payment is processed securely via Stripe after your order is confirmed.
      </p>
    </div>
  )
}
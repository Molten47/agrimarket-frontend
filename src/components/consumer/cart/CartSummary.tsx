import { Separator } from '@/components/ui/separator'
import { Lock } from 'lucide-react'

interface Props {
  total:      string
  onCheckout: () => void
}

export function CartSummary({ total, onCheckout }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4 sticky top-24">
      <h2 className="font-semibold text-sm">Order Summary</h2>
      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">£{Number(total).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-muted-foreground text-xs">At checkout</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-bold text-sm">
        <span>Total</span>
        <span>£{Number(total).toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full h-10 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: 'oklch(0.62 0.16 40)', color: '#fff' }}
      >
        Proceed to Checkout →
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        <span>Secure checkout via Stripe</span>
      </div>
    </div>
  )
}
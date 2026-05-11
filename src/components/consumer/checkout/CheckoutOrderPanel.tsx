import { Cart } from '@/types'

interface Props {
  cart: Cart | null
}

export function CheckoutOrderPanel({ cart }: Props) {
  return (
    <div
      className="md:col-span-2 px-6 py-6 border-t md:border-t-0 md:border-l"
      style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#122a21' }}
    >
      <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-medium">
        Order Summary
      </p>

      {cart && cart.items.length > 0 ? (
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.product_id} className="flex justify-between text-sm">
              <span className="text-white/70 truncate pr-2 flex-1">
                {item.product_name}
                <span className="text-white/40 ml-1">×{item.quantity}</span>
              </span>
              <span className="text-white font-medium shrink-0">
                £{Number(item.line_total).toFixed(2)}
              </span>
            </div>
          ))}

          <div
            className="pt-3 mt-3 border-t flex justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <span className="text-white font-semibold text-sm">Total</span>
            <span className="text-white font-bold text-sm">
              £{Number(cart.total).toFixed(2)}
            </span>
          </div>

          <p className="text-white/40 text-xs pt-2 leading-relaxed">
            Payment processed securely via Stripe after your order is confirmed.
          </p>
        </div>
      ) : (
        <p className="text-white/40 text-sm">No items in cart.</p>
      )}
    </div>
  )
}
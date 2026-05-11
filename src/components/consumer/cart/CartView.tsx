import { Cart } from '@/types'
import type { StripeCardElement } from '@stripe/stripe-js'
import { CartHeader } from './CartHeader'
import { CartItemList } from './CartItemList'
import { CartSummary } from './CartSummary'
import { CheckoutModal } from '../checkout/CheckoutModal'

type CheckoutStep = 'delivery' | 'payment' | 'processing'

interface Props {
  cart:             Cart | undefined
  isLoading:        boolean
  isRemoving:       boolean
  checkoutOpen:     boolean
  checkoutStep:     CheckoutStep
  checkoutError:    string | null
  isPlacing:        boolean
  billingEmail:     string
  onRemove:         (productId: string) => void
  onUpdate:         (productId: string, quantity: number) => void
  onClear:          () => void
  onCheckout:       () => void
  onCloseCheckout:  () => void
  onPlaceOrder:     (e: React.FormEvent<HTMLFormElement>) => void
  onConfirmPayment: (card: StripeCardElement, email: string) => void
  onBackToDelivery: () => void
}

export function CartView({
  cart, isLoading, isRemoving,
  checkoutOpen, checkoutStep, checkoutError, isPlacing, billingEmail,
  onRemove, onUpdate, onClear,
  onCheckout, onCloseCheckout, onPlaceOrder, onConfirmPayment, onBackToDelivery,
}: Props) {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 w-40 bg-muted rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CartHeader itemCount={cart?.item_count ?? 0} onClear={onClear} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartItemList
            items={cart?.items ?? []}
            isRemoving={isRemoving}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        </div>
        {cart && cart.item_count > 0 && (
          <CartSummary total={cart.total} onCheckout={onCheckout} />
        )}
      </div>

      <CheckoutModal
        open={checkoutOpen}
        cart={cart ?? null}
        step={checkoutStep}
        isLoading={isPlacing}
        error={checkoutError}
        billingEmail={billingEmail}
        onClose={onCloseCheckout}
        onSubmitDelivery={onPlaceOrder}
        onConfirmPayment={onConfirmPayment}
        onBackToDelivery={onBackToDelivery}
      />
    </div>
  )
}
import { useCart } from '@/hooks/useCart'
import { useCheckout } from '@/hooks/useCheckout'
import { CartView } from '@/components/consumer/cart/CartView'

export default function CartPage() {
  const cart     = useCart()
  const checkout = useCheckout()

  return (
    <CartView
      cart={cart.cart}
      isLoading={cart.isLoading}
      isRemoving={cart.isRemoving}
      checkoutOpen={checkout.isOpen}
      checkoutStep={checkout.step}
      checkoutError={checkout.error}
      isPlacing={checkout.isLoading}
      billingEmail={checkout.billingEmail}   // ← sourced from form, no cast
      onRemove={cart.onRemove}
      onUpdate={(productId, quantity) => cart.onUpdate({ productId, quantity })}
      onClear={cart.onClear}
      onCheckout={checkout.openCheckout}
      onCloseCheckout={checkout.closeCheckout}
      onPlaceOrder={checkout.handleDeliverySubmit}
      onConfirmPayment={checkout.confirmPayment}
      onBackToDelivery={checkout.backToDelivery}
    />
  )
}
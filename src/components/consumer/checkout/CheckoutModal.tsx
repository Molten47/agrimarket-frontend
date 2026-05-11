import { Elements } from '@stripe/react-stripe-js'
import type { StripeCardElement } from '@stripe/stripe-js'
import { stripePromise } from '@/lib/stripe'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { CheckoutForm } from './CheckoutForm'
import { CheckoutModalHeader } from './CheckoutModalHeader'
import { CheckoutOrderPanel } from './CheckoutOrderPanel'
import { StripeCardStep } from './StripCardStep'
import { Cart } from '@/types'

type CheckoutStep = 'delivery' | 'payment' | 'processing'

interface Props {
  open:             boolean
  cart:             Cart | null
  step:             CheckoutStep
  isLoading:        boolean
  error:            string | null
  billingEmail:     string
  onClose:          () => void
  onSubmitDelivery: (e: React.FormEvent<HTMLFormElement>) => void
  onConfirmPayment: (card: StripeCardElement, email: string) => void
  onBackToDelivery: () => void
}

export function CheckoutModal({
  open, cart, step, isLoading, error, billingEmail,
  onClose, onSubmitDelivery, onConfirmPayment, onBackToDelivery,
}: Props) {
  const isLocked = step === 'payment' || step === 'processing'

  const handleOpenChange = (next: boolean) => {
    if (isLocked) return
    if (!next) onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden border-0 shadow-2xl"
        style={{ borderRadius: '1rem', maxWidth: '760px', width: '86vw' }}
        onInteractOutside={e => { if (isLocked) e.preventDefault() }}
        onEscapeKeyDown={e => { if (isLocked) e.preventDefault() }}
      >
        {/* Required by Radix Dialog for screen reader accessibility */}
        <VisuallyHidden>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Complete your order details and payment.</DialogDescription>
        </VisuallyHidden>

        <CheckoutModalHeader step={step} onClose={isLocked ? undefined : onClose} />

        <div className="grid grid-cols-1 md:grid-cols-5" style={{ background: '#1a3a2e' }}>
          <div className="md:col-span-3 px-10 py-8">
            <Elements stripe={stripePromise}>
              {step === 'delivery' && (
                <CheckoutForm
                  isLoading={isLoading}
                  error={error}
                  onSubmit={onSubmitDelivery}
                />
              )}
              {(step === 'payment' || step === 'processing') && (
                <StripeCardStep
                  billingEmail={billingEmail}
                  isProcessing={step === 'processing'}
                  error={error}
                  onConfirm={onConfirmPayment}
                  onBack={onBackToDelivery}
                />
              )}
            </Elements>
          </div>
          <CheckoutOrderPanel cart={cart} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { Cart } from '@/types'
import { CheckoutHeader } from './CheckoutHeader'
import { CheckoutForm } from './CheckoutForm'
import { CheckoutOrderSummary } from './CheckoutOrdersSummary'

interface Props {
  cart:      Cart | null
  isLoading: boolean
  error:     string | null
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
}

export function CheckoutView({ cart, isLoading, error, onSubmit }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CheckoutHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CheckoutForm
            isLoading={isLoading}
            error={error}
            onSubmit={onSubmit}
          />
        </div>
        <div>
          <CheckoutOrderSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}
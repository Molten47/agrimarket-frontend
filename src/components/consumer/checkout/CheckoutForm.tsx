import { EmailField } from './EmailField'
import { DeliveryFields } from './DeliveryField'
import { CheckoutError } from './CheckoutError'
import { CheckoutSubmitButton } from './/CheckoutSubmitButton'

interface Props {
  isLoading: boolean
  error:     string | null
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
}

export function CheckoutForm({ isLoading, error, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <EmailField />
      <DeliveryFields />
      <CheckoutError error={error} />
      <CheckoutSubmitButton isLoading={isLoading} />
    </form>
  )
}
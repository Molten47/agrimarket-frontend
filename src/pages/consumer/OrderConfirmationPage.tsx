import { useOrderConfirmation } from '@/hooks/useOrderConfirmation'
import { ConfirmationView } from '@/components/consumer/confirmation/ConfirmationView'
export default function OrderConfirmationPage() {
  const { order, isLoading, isError, orderKey } = useOrderConfirmation()
  return <ConfirmationView order={order} isLoading={isLoading} isError={isError} orderKey={orderKey} />
}

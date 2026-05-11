import { Order } from '@/types'
import { ConfirmationHero } from './ConfirmationHero'
import { ConfirmationDetails } from './ConfirmationDetails'
import { ConfirmationItemList } from './ConfirmationItemList'
import { ConfirmationActions } from './ConfirmationActions'

interface Props {
  order:     Order | undefined
  isLoading: boolean
  isError:   boolean
  orderKey:  string
}

export function ConfirmationView({ order, isLoading, isError, orderKey }: Props) {
  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center text-muted-foreground">
        <p className="text-lg font-semibold mb-2">Order not found</p>
        <p className="text-sm">Check your confirmation email for your order details.</p>
      </div>
    )
  }

  // Backend returns total_amount_gbp; total_gbp is a legacy alias
  const total = order.total_amount_gbp ?? order.total_gbp

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
      <ConfirmationHero
        orderKey={orderKey}
        totalAmountGbp={total}
        paymentStatus={order.payment_status}
      />
      <ConfirmationDetails order={order} />
      <ConfirmationItemList
        items={order.items}
        totalGbp={total}
      />
      <ConfirmationActions />
    </div>
  )
}
import { CheckCircle2 } from 'lucide-react'

interface Props {
  orderKey:      string
  totalAmountGbp?: string
  paymentStatus?: string
}

export function ConfirmationHero({ orderKey, totalAmountGbp, paymentStatus }: Props) {
  const isPaid = paymentStatus === 'paid'

  return (
    <div className="text-center py-8 space-y-3">
      <div className="flex justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: '#dcfce7', border: '3px solid #16a34a' }}
        >
          <CheckCircle2 className="h-10 w-10" style={{ color: '#16a34a' }} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          {isPaid ? 'Payment Confirmed!' : 'Order Placed!'}
        </h1>

        {isPaid && totalAmountGbp && (
          <p className="text-lg font-bold mt-1" style={{ color: '#16a34a' }}>
            £{Number(totalAmountGbp).toFixed(2)} paid
          </p>
        )}

        <p className="text-sm text-muted-foreground mt-1">
          Reference:{' '}
          <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">
            #{orderKey.slice(0, 8).toUpperCase()}
          </span>
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        {isPaid
          ? 'Your payment was successful. A confirmation email is on its way. 🌱'
          : 'A confirmation email is on its way to you. 🌱'}
      </p>
    </div>
  )
}
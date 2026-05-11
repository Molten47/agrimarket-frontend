import { Order } from '@/types'
import { Separator } from '@/components/ui/separator'
import { MapPin, Mail } from 'lucide-react'

interface Props {
  order: Order
}

export function ConfirmationDetails({ order }: Props) {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold text-sm">Delivery Details</h2>
      <Separator />

      <div className="flex items-start gap-3 text-sm">
        <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <span>{order.guest_email}</span>
      </div>

      <div className="flex items-start gap-3 text-sm">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="space-y-0.5">
          <p>{order.delivery_name}</p>
          <p className="text-muted-foreground">{order.delivery_address}</p>
          <p className="text-muted-foreground">
            {order.delivery_county}, {order.delivery_postcode}
          </p>
        </div>
      </div>
    </div>
  )
}
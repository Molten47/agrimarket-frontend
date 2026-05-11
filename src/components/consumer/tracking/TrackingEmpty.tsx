import { Clock } from 'lucide-react'

export function TrackingEmpty() {
  return (
    <div className="rounded-xl border p-8 text-center space-y-2">
      <Clock className="mx-auto h-8 w-8 text-muted-foreground/40" />
      <p className="text-sm font-medium text-muted-foreground">No tracking events yet</p>
      <p className="text-xs text-muted-foreground/60">
        Your farmer will update this once your order is on its way.
      </p>
    </div>
  )
}
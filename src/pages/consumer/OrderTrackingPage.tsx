import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useOrderTracking } from '@/hooks/useOrderTracking'
import { TrackingHeader } from '@/components/consumer/tracking/TrackingHeader'
import { TrackingTimeline } from '@/components/consumer/tracking/TrackingTimeline'

export default function OrderTrackingPage() {
  const { events, isLoading, isError, orderId, orderKey } = useOrderTracking()
  const latestStatus = events.length > 0 ? events[events.length - 1].status : 'pending'

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center text-muted-foreground">
        <p className="text-lg font-semibold mb-2">Tracking not found</p>
        <p className="text-sm mb-6">Check your confirmation email for your order link.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2"
          style={{ padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
      <Link
        to={`/order/${orderId}/confirmed?key=${orderKey}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        style={{ textDecoration: 'none' }}
      >
        <ArrowLeft size={14} /> Back to order
      </Link>
      <TrackingHeader orderKey={orderKey} latestStatus={latestStatus} />
      <TrackingTimeline events={events} />
      <div className="text-center pt-2">
        <Link to="/shop"
          style={{ fontSize: 13, color: 'var(--muted-foreground)', textDecoration: 'none' }}
          className="hover:text-foreground transition-colors"
        >
          Continue shopping →
        </Link>
      </div>
    </div>
  )
}
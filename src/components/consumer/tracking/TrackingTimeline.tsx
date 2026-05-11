import { TrackingEvent } from '@/api/tracking.api'
import { TrackingNode } from './TrackingNode'
import { TrackingEmpty } from './TrackingEmpty'

interface Props {
  events: TrackingEvent[]
}

export function TrackingTimeline({ events }: Props) {
  if (events.length === 0) return <TrackingEmpty />

  const reversed = [...events].reverse()

  return (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold text-sm mb-5">Tracking History</h2>
      <div className="relative">
        {reversed.map((event, i) => (
          <TrackingNode
            key={event.id}
            event={event}
            isLatest={i === 0}
            isLast={i === reversed.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
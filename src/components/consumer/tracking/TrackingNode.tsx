import { MapPin, Clock, CheckCircle2, Package, Truck, Home, AlertCircle } from 'lucide-react'
import { TrackingEvent } from '@/api/tracking.api'

interface Props {
  event:    TrackingEvent
  isLatest: boolean
  isLast:   boolean
}

const STATUS_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  confirmed:  { icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' },
  processing: { icon: Package,      color: '#d97706', bg: '#fef3c7' },
  dispatched: { icon: Truck,        color: '#2563eb', bg: '#dbeafe' },
  delivered:  { icon: Home,         color: '#16a34a', bg: '#dcfce7' },
  cancelled:  { icon: AlertCircle,  color: '#dc2626', bg: '#fee2e2' },
}

function getConfig(status: string) {
  return STATUS_CONFIG[status.toLowerCase()] ?? { icon: Clock, color: '#6b7280', bg: '#f3f4f6' }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')
}

export function TrackingNode({ event, isLatest, isLast }: Props) {
  const { icon: Icon, color, bg } = getConfig(event.status)

  return (
    <div className="flex gap-4 relative">
      {!isLast && (
        <div style={{
          position: 'absolute', left: 19, top: 40, bottom: 0,
          width: 2, background: '#e5e7eb',
        }} />
      )}

      <div style={{
        flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
        background: bg, border: `2px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1, boxShadow: isLatest ? `0 0 0 4px ${bg}` : 'none',
      }}>
        <Icon size={18} style={{ color }} />
      </div>

      <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1, paddingTop: 8 }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p style={{ fontWeight: isLatest ? 700 : 500, fontSize: 14, color: isLatest ? color : 'inherit' }}>
              {formatStatus(event.status)}
              {isLatest && (
                <span style={{
                  marginLeft: 8, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  background: bg, color, padding: '2px 6px',
                  borderRadius: 999, border: `1px solid ${color}`, verticalAlign: 'middle',
                }}>
                  Latest
                </span>
              )}
            </p>
            {event.location_label && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin size={11} /> {event.location_label}
              </p>
            )}
          </div>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(event.event_time)}
          </p>
        </div>
      </div>
    </div>
  )
}
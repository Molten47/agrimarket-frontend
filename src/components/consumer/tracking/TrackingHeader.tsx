import { RefreshCw, Package } from 'lucide-react'

interface Props {
  orderKey:     string
  latestStatus: string
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: 'Pending',    color: '#6b7280', bg: '#f3f4f6' },
  confirmed:  { label: 'Confirmed',  color: '#16a34a', bg: '#dcfce7' },
  processing: { label: 'Processing', color: '#d97706', bg: '#fef3c7' },
  dispatched: { label: 'Dispatched', color: '#2563eb', bg: '#dbeafe' },
  delivered:  { label: 'Delivered',  color: '#16a34a', bg: '#dcfce7' },
  cancelled:  { label: 'Cancelled',  color: '#dc2626', bg: '#fee2e2' },
}

export function TrackingHeader({ orderKey, latestStatus }: Props) {
  const cfg = STATUS_LABELS[latestStatus] ?? STATUS_LABELS.pending

  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: 'oklch(0.18 0.06 148)', opacity: 0.08,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Package size={20} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Order reference</p>
            <p className="font-mono font-semibold text-sm">
              #{orderKey.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        <span style={{
          background: cfg.bg, color: cfg.color,
          fontSize: 12, fontWeight: 700,
          padding: '4px 10px', borderRadius: 999,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          {cfg.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mt-4 pt-4 border-t">
        <RefreshCw size={11} className="text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Updates automatically every 30 seconds
        </p>
      </div>
    </div>
  )
}
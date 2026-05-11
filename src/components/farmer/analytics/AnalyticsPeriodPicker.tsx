import { Period } from '@/api/analytics.api'
import { CARD, BORDER, AMBER_HEX, MUTED } from './tokens'

const PERIODS: { label: string; value: Period }[] = [
  { label: '7 days',  value: '7d'   },
  { label: '30 days', value: '30d'  },
  { label: '90 days', value: '90d'  },
  { label: '1 year',  value: '365d' },
]

interface Props { period: Period; onChange: (p: Period) => void }

export function AnalyticsPeriodPicker({ period, onChange }: Props) {
  return (
    <div className="flex gap-1.5 p-1 rounded-xl"
      style={{ background: CARD, border: `1px solid ${BORDER}` }}>
      {PERIODS.map(({ label, value }) => (
        <button key={value} onClick={() => onChange(value)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: period === value ? AMBER_HEX : 'transparent',
            color:      period === value ? '#fff' : MUTED,
          }}>
          {label}
        </button>
      ))}
    </div>
  )
}
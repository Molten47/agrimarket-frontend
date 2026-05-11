import { DateRange } from '@/api/bookkeeping.api'
import { CARD, BORDER, MUTED, TEXT, AMBER_HEX } from './tokens'

const PRESETS = [
  { label: 'This month', days: 30  },
  { label: '3 months',   days: 90  },
  { label: '6 months',   days: 180 },
  { label: 'This year',  days: 365 },
]

function fmt(d: number) {
  const date = new Date()
  date.setDate(date.getDate() - d)
  return date.toISOString().slice(0, 10)
}

interface Props { range: DateRange; onChange: (r: DateRange) => void }

export function BookkeepingDatePicker({ range, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex gap-1.5 p-1 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        {PRESETS.map(({ label, days }) => {
          const from = fmt(days)
          const active = range.from === from
          return (
            <button key={label} onClick={() => onChange({ from, to: new Date().toISOString().slice(0, 10) })}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: active ? AMBER_HEX : 'transparent', color: active ? '#fff' : MUTED }}>
              {label}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
        <input type="date" value={range.from}
          onChange={e => onChange({ ...range, from: e.target.value })}
          className="rounded-lg px-3 py-1.5 text-xs"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT }} />
        <span>→</span>
        <input type="date" value={range.to}
          onChange={e => onChange({ ...range, to: e.target.value })}
          className="rounded-lg px-3 py-1.5 text-xs"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT }} />
      </div>
    </div>
  )
}
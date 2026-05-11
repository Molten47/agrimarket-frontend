import { StockSummary } from '@/types'

interface Props {
  summary: StockSummary | undefined
}

const items = [
  {
    key:       'in_stock',
    label:     'In Stock',
    bg:        '#dcfce7',
    border:    '#86efac',
    numColor:  '#15803d',
    lblColor:  '#166534',
    dot:       '#22c55e',
  },
  {
    key:       'low_stock',
    label:     'Low Stock',
    bg:        '#fef9c3',
    border:    '#fde047',
    numColor:  '#a16207',
    lblColor:  '#854d0e',
    dot:       '#eab308',
  },
  {
    key:       'out_of_stock',
    label:     'Out of Stock',
    bg:        '#fee2e2',
    border:    '#fca5a5',
    numColor:  '#dc2626',
    lblColor:  '#991b1b',
    dot:       '#ef4444',
  },
  {
    key:       'total',
    label:     'Total Listed',
    bg:        '#fef3c7',
    border:    '#fcd34d',
    numColor:  '#b45309',
    lblColor:  '#92400e',
    dot:       '#e07b28',
  },
] as const

export function StockSummaryBar({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {items.map(({ key, label, bg, border, numColor, lblColor, dot }) => (
        <div key={key} className="rounded-xl px-4 py-4 flex flex-col gap-2"
          style={{ background: bg, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
            <p className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: lblColor }}>
              {label}
            </p>
          </div>
          <p className="text-3xl font-bold leading-none" style={{ color: numColor }}>
            {summary?.[key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  )
}
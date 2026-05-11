import { Package, TrendingDown, XCircle, BarChart3 } from 'lucide-react'
import { StockSummary } from '@/types'

interface Props {
  summary:   StockSummary | undefined
  isLoading: boolean
}

const cards = [
  {
    key: 'in_stock',
    label: 'In Stock',
    icon: Package,
    bg: '#dcfce7', iconBg: '#16a34a', iconColor: '#fff', textColor: '#14532d',
  },
  {
    key: 'low_stock',
    label: 'Low Stock',
    icon: TrendingDown,
    bg: '#fef9c3', iconBg: '#ca8a04', iconColor: '#fff', textColor: '#713f12',
  },
  {
    key: 'out_of_stock',
    label: 'Out of Stock',
    icon: XCircle,
    bg: '#fee2e2', iconBg: '#dc2626', iconColor: '#fff', textColor: '#7f1d1d',
  },
  {
    key: 'total',
    label: 'Total Listed',
    icon: BarChart3,
    bg: '#fef3c7', iconBg: '#e07b28', iconColor: '#fff', textColor: '#78350f',
  },
] as const

export function StockSummaryCards({ summary, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(({ key, label, icon: Icon, bg, iconBg, iconColor, textColor }) => (
        <div
          key={key}
          className="rounded-xl p-4"
          style={{ background: bg, border: `1px solid ${iconBg}22` }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
            style={{ background: iconBg }}
          >
            <Icon className="h-4.5 w-4.5" style={{ color: iconColor, width: 18, height: 18 }} />
          </div>
          <p className="text-2xl font-bold" style={{ color: textColor }}>
            {summary?.[key] ?? 0}
          </p>
          <p className="text-xs font-medium mt-0.5" style={{ color: textColor, opacity: 0.75 }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
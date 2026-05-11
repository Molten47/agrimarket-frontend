import { useState } from 'react'
import { TrendingUp, ShoppingBag, Users, ArrowRight } from 'lucide-react'
import { SummaryResponse } from '@/api/analytics.api'
import { AnalyticsModal } from './AnalyticsModal'

interface Props {
  data:      SummaryResponse | undefined
  isLoading: boolean
}

function fmt(n: string | number) { return `£${Number(n).toFixed(2)}` }

const stats = [
  { key: 'total_revenue_gbp',   label: 'Revenue',   icon: TrendingUp,  format: fmt    },
  { key: 'total_orders',        label: 'Orders',    icon: ShoppingBag, format: String },
  { key: 'average_order_value', label: 'Avg Order', icon: Users,       format: fmt    },
] as const

export function AnalyticsSummaryPanel({ data, isLoading }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="rounded-2xl p-5 mb-6"
        style={{ background: '#f5f0e8', border: '1px solid #e8e0d0' }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-stone-700">Analytics — Last 30 Days</p>
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors">
            Full report <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-stone-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ key, label, icon: Icon, format }) => (
              <div key={key} className="rounded-xl p-3 bg-white/70 cursor-pointer hover:bg-white transition-colors"
                style={{ border: '1px solid #e8e0d0' }}
                onClick={() => setOpen(true)}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-amber-700" />
                  <p className="text-xs text-stone-500">{label}</p>
                </div>
                <p className="text-lg font-bold text-stone-800">
                  {data ? format(data[key] as any) : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && <AnalyticsModal onClose={() => setOpen(false)} />}
    </>
  )
}
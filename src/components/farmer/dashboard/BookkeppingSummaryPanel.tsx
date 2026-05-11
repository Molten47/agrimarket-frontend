import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, DollarSign, ArrowRight } from 'lucide-react'
import { BookkeepingSummary } from '@/api/bookkeeping.api'

interface Props {
  data:      BookkeepingSummary | undefined
  isLoading: boolean
}

function fmt(n: string | number) {
  return `£${Number(n).toFixed(2)}`
}

export function BookkeepingSummaryPanel({ data, isLoading }: Props) {
  const profit   = Number(data?.net_profit_gbp ?? 0)
  const positive = profit >= 0

  return (
    <div className="rounded-2xl p-5 mb-6"
      style={{ background: '#f0f7f4', border: '1px solid #d1e8df' }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-emerald-900">Bookkeeping — Last 30 Days</p>
        <Link to="/dashboard/bookkeeping"
          className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 transition-colors">
          Full records <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-emerald-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl p-3 bg-white/70" style={{ border: '1px solid #d1e8df' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <p className="text-xs text-stone-500">Income</p>
            </div>
            <p className="text-lg font-bold text-stone-800">{data ? fmt(data.total_income_gbp) : '—'}</p>
            <p className="text-xs text-stone-400 mt-0.5">{data?.order_count ?? 0} orders</p>
          </div>

          <div className="rounded-xl p-3 bg-white/70" style={{ border: '1px solid #d1e8df' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
              <p className="text-xs text-stone-500">Expenses</p>
            </div>
            <p className="text-lg font-bold text-stone-800">{data ? fmt(data.total_expenses_gbp) : '—'}</p>
            <p className="text-xs text-stone-400 mt-0.5">{data?.expense_count ?? 0} entries</p>
          </div>

          <div className="rounded-xl p-3 bg-white/70" style={{ border: '1px solid #d1e8df' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <DollarSign className="w-3.5 h-3.5" style={{ color: positive ? '#16a34a' : '#dc2626' }} />
              <p className="text-xs text-stone-500">Net Profit</p>
            </div>
            <p className="text-lg font-bold" style={{ color: positive ? '#14532d' : '#7f1d1d' }}>
              {data ? fmt(data.net_profit_gbp) : '—'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
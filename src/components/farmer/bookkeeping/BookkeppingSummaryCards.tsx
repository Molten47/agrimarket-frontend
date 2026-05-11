import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { BookkeepingSummary } from '@/api/bookkeeping.api'
import { Card, fmt, TEXT, MUTED, GREEN, ROSE, TEAL } from './tokens'

function StatCard({ icon: Icon, label, value, color, sub }: {
  icon: React.ElementType; label: string; value: string; color: string; sub?: string
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: MUTED }}>{label}</p>
          <p className="text-2xl font-bold" style={{ color: TEXT }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: MUTED }}>{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </Card>
  )
}

export function BookkeepingSummaryCards({ data }: { data?: BookkeepingSummary }) {
  const profit = Number(data?.net_profit_gbp ?? 0)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={TrendingUp}   label="Total Income"   color={GREEN}
        value={data ? fmt(data.total_income_gbp)   : '—'}
        sub={data ? `${data.order_count} orders` : undefined} />
      <StatCard icon={TrendingDown} label="Total Expenses" color={ROSE}
        value={data ? fmt(data.total_expenses_gbp) : '—'}
        sub={data ? `${data.expense_count} entries` : undefined} />
      <StatCard icon={DollarSign}   label="Net Profit"     color={profit >= 0 ? TEAL : ROSE}
        value={data ? fmt(data.net_profit_gbp) : '—'} />
    </div>
  )
}
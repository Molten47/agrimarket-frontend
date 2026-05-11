import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react'
import { SummaryResponse } from '@/api/analytics.api'
import { Card, fmt, TEXT, MUTED, GREEN, AMBER_HEX, TEAL, PURPLE } from './tokens'

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color: string
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

export function AnalyticsStatCards({ data }: { data?: SummaryResponse }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={TrendingUp}  label="Total Revenue"    color={GREEN}     value={data ? fmt(data.total_revenue_gbp)   : '—'} />
      <StatCard icon={ShoppingBag} label="Total Orders"     color={AMBER_HEX} value={data ? String(data.total_orders)     : '—'} />
      <StatCard icon={Package}     label="Avg Order Value"  color={TEAL}      value={data ? fmt(data.average_order_value) : '—'} />
      <StatCard icon={Users}       label="Active Products"  color={PURPLE}    value={data ? String(data.total_products)   : '—'}
        sub={data ? `${data.low_stock_count} low · ${data.out_of_stock_count} out` : undefined} />
    </div>
  )
}
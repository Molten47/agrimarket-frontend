import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/api/analytics.api'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp, ShoppingBag, Package } from 'lucide-react'

function fmt(n: string | number) { return `£${Number(n).toFixed(2)}` }

const AMBER  = '#e07b28'
const GREEN  = '#4ade80'
const TEAL   = '#2dd4bf'
const MUTED  = 'rgba(0,0,0,0.45)'
const BORDER = 'rgba(0,0,0,0.08)'

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl px-3 py-2 shadow-lg text-xs"
      style={{ background: '#1a3a2e', color: '#fff' }}>
      {label && <p className="font-semibold mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.name?.toLowerCase().includes('revenue') ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsModalContent() {
  const summary  = useQuery({ queryKey: ['analytics', 'summary',  '30d'], queryFn: () => analyticsApi.summary('30d')  })
  const revenue  = useQuery({ queryKey: ['analytics', 'revenue',  '30d'], queryFn: () => analyticsApi.revenue('30d')  })
  const s = summary.data
  const r = revenue.data

  return (
    <div className="space-y-5">

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: TrendingUp,  label: 'Revenue',   value: s ? fmt(s.total_revenue_gbp)   : '—', color: GREEN  },
          { icon: ShoppingBag, label: 'Orders',    value: s ? String(s.total_orders)      : '—', color: AMBER  },
          { icon: Package,     label: 'Avg Order', value: s ? fmt(s.average_order_value)  : '—', color: TEAL   },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl p-3"
            style={{ background: '#1a3a2e', border: `1px solid rgba(255,255,255,0.08)` }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
            </div>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue area chart */}
      <div>
        <p className="text-xs font-semibold mb-3 text-stone-500">Revenue — Last 30 Days</p>
        {r?.chart.length ? (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={r.chart} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={AMBER} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={AMBER} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
              <XAxis dataKey="date" tick={{ fill: MUTED, fontSize: 10 }}
                tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false}
                axisLine={false} tickFormatter={v => `£${v}`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue_gbp" name="Revenue"
                stroke={AMBER} strokeWidth={2} fill="url(#grad)"
                dot={false} activeDot={{ r: 4, fill: AMBER }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-xs text-stone-400">
            No revenue data yet
          </div>
        )}
      </div>

      {/* Top products */}
      {r?.top_products.length ? (
        <div>
          <p className="text-xs font-semibold mb-3 text-stone-500">Top Products</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={r.top_products.slice(0, 4)} layout="vertical"
              margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} horizontal={false} />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }}
                tickLine={false} axisLine={false} tickFormatter={v => `£${v}`} />
              <YAxis type="category" dataKey="product_name" tick={{ fill: MUTED, fontSize: 10 }}
                tickLine={false} axisLine={false} width={80} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="total_revenue" name="Revenue"
                radius={[0, 5, 5, 0]} fill={AMBER} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

    </div>
  )
}
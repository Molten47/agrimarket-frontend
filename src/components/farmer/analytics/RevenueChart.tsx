import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RevenuePoint } from '@/api/analytics.api'
import { Card, TEXT, MUTED, BORDER, AMBER_HEX } from './tokens'
import { ChartTooltip } from './ChartTooltip'

export function RevenueChart({ data }: { data?: RevenuePoint[] }) {
  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>Revenue Over Time</p>
      {data?.length ? (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={AMBER_HEX} stopOpacity={0.35} />
                <stop offset="95%" stopColor={AMBER_HEX} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
            <XAxis dataKey="date" tick={{ fill: MUTED, fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: MUTED, fontSize: 11 }} tickLine={false} axisLine={false}
              tickFormatter={v => `£${v}`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue_gbp" name="Revenue"
              stroke={AMBER_HEX} strokeWidth={2.5} fill="url(#revenueGrad)"
              dot={false} activeDot={{ r: 5, fill: AMBER_HEX }} />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-60 flex items-center justify-center" style={{ color: MUTED }}>
          No revenue data for this period
        </div>
      )}
    </Card>
  )
}
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import { CustomerMetrics } from '@/api/analytics.api'
import { Card, TEXT, MUTED, BORDER, AMBER_HEX } from './tokens'

export function CustomerLoyaltyChart({ data }: { data?: CustomerMetrics }) {
  const repeatRate = data
    ? Math.round((data.repeat_customers / Math.max(data.unique_customers, 1)) * 100) : 0
  const radialData = [{ name: 'Repeat', value: repeatRate, fill: AMBER_HEX }]

  return (
    <Card>
      <p className="font-semibold mb-2" style={{ color: TEXT }}>Customer Loyalty</p>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={160}>
          <RadialBarChart cx="50%" cy="50%" innerRadius={45} outerRadius={70}
            data={radialData} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" background={{ fill: BORDER }} cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="-mt-14 text-center">
          <p className="text-3xl font-bold" style={{ color: AMBER_HEX }}>{repeatRate}%</p>
          <p className="text-xs mt-0.5" style={{ color: MUTED }}>repeat rate</p>
        </div>
        <div className="mt-8 flex gap-6 text-center">
          <div>
            <p className="text-lg font-bold" style={{ color: TEXT }}>{data?.unique_customers ?? '—'}</p>
            <p className="text-xs" style={{ color: MUTED }}>unique</p>
          </div>
          <div>
            <p className="text-lg font-bold" style={{ color: TEXT }}>{data?.repeat_customers ?? '—'}</p>
            <p className="text-xs" style={{ color: MUTED }}>repeat</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TopProduct } from '@/api/analytics.api'
import { Card, TEXT, MUTED, BORDER, AMBER_HEX } from './tokens'
import { ChartTooltip } from './ChartTooltip'

export function TopProductsChart({ data }: { data?: TopProduct[] }) {
  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>Top Products by Revenue</p>
      {data?.length ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} horizontal={false} />
            <XAxis type="number" tick={{ fill: MUTED, fontSize: 11 }} tickLine={false}
              axisLine={false} tickFormatter={v => `£${v}`} />
            <YAxis type="category" dataKey="product_name" tick={{ fill: MUTED, fontSize: 11 }}
              tickLine={false} axisLine={false} width={90} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="total_revenue" name="Revenue" radius={[0, 6, 6, 0]} fill={AMBER_HEX} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-52 flex items-center justify-center" style={{ color: MUTED }}>
          No sales data for this period
        </div>
      )}
    </Card>
  )
}
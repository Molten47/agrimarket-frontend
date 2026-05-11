import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { StockItem } from '@/api/analytics.api'
import { Card, TEXT, MUTED, GREEN, AMBER_HEX, ROSE } from './tokens'
import { ChartTooltip } from './ChartTooltip'

export function StockPieChart({ data }: { data: StockItem[] }) {
  const pieData = [
    { name: 'In Stock',     value: data.filter(i => i.stock_status === 'in_stock').length },
    { name: 'Low Stock',    value: data.filter(i => i.stock_status === 'low_stock').length },
    { name: 'Out of Stock', value: data.filter(i => i.stock_status === 'out_of_stock').length },
  ]
  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>Stock Status</p>
      {data.length ? (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              paddingAngle={4} dataKey="value" strokeWidth={0}>
              {pieData.map((_, i) => <Cell key={i} fill={[GREEN, AMBER_HEX, ROSE][i]} />)}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend formatter={(v) => <span style={{ color: MUTED, fontSize: 12 }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-52 flex items-center justify-center" style={{ color: MUTED }}>No stock data</div>
      )}
    </Card>
  )
}
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, TEXT, MUTED, BORDER, TEAL } from './tokens'
import { ChartTooltip } from './ChartTooltip'

export function CountyChart({ data }: { data?: { county: string; orders: number }[] }) {
  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>Orders by County</p>
      {data?.length ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
            <XAxis dataKey="county" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: MUTED, fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="orders" name="Orders" radius={[6, 6, 0, 0]} fill={TEAL} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-48 flex items-center justify-center" style={{ color: MUTED }}>No county data</div>
      )}
    </Card>
  )
}
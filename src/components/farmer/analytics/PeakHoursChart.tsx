import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, TEXT, MUTED, BORDER, PURPLE } from './tokens'
import { ChartTooltip } from './ChartTooltip'

export function PeakHoursChart({ data }: { data?: { hour: number; orders: number }[] }) {
  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>Peak Order Hours</p>
      {data?.length ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
            <XAxis dataKey="hour" tick={{ fill: MUTED, fontSize: 11 }} tickLine={false}
              axisLine={false} tickFormatter={h => `${h}:00`} />
            <YAxis tick={{ fill: MUTED, fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="orders" name="Orders" radius={[6, 6, 0, 0]} fill={PURPLE} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-48 flex items-center justify-center" style={{ color: MUTED }}>No peak hour data</div>
      )}
    </Card>
  )
}
import { AlertTriangle } from 'lucide-react'
import { StockItem, SummaryResponse } from '@/api/analytics.api'
import { Card, TEXT, MUTED, BORDER, GREEN, AMBER_HEX, ROSE } from './tokens'

export function StockHealthTable({ data, summary }: { data: StockItem[]; summary?: SummaryResponse }) {
  if (!data.length) return null
  const alertCount = (summary?.low_stock_count ?? 0) + (summary?.out_of_stock_count ?? 0)

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold" style={{ color: TEXT }}>Stock Health</p>
        {alertCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ background: `${ROSE}20`, color: ROSE }}>
            <AlertTriangle className="w-3 h-3" />{alertCount} need attention
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {['Product', 'Available', 'Reserved', 'Sold (30d)', 'Status'].map(h => (
                <th key={h} className="text-left pb-3 pr-4 font-medium" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              const color = item.stock_status === 'in_stock' ? GREEN
                : item.stock_status === 'low_stock' ? AMBER_HEX : ROSE
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: TEXT }}>{item.product_name}</td>
                  <td className="py-3 pr-4" style={{ color: MUTED }}>{Number(item.quantity_available).toFixed(2)}</td>
                  <td className="py-3 pr-4" style={{ color: MUTED }}>{Number(item.quantity_reserved).toFixed(2)}</td>
                  <td className="py-3 pr-4" style={{ color: MUTED }}>{Number(item.units_sold_30d).toFixed(2)}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ background: `${color}20`, color }}>
                      {item.stock_status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
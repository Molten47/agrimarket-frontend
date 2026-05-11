import { IncomeRecord } from '@/api/bookkeeping.api'
import { Card, fmt, TEXT, MUTED, BORDER, GREEN, AMBER_HEX } from './tokens'

function exportCsv(data: IncomeRecord[]) {
  const header = 'Order Key,Date,Customer,Amount,Status'
  const rows   = data.map(r =>
    `${r.order_key},${r.placed_at.slice(0,10)},${r.guest_email},${fmt(r.total_amount_gbp)},${r.order_status}`
  )
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
  const a    = document.createElement('a')
  a.href     = URL.createObjectURL(blob)
  a.download = 'income.csv'
  a.click()
}

export function IncomeTable({ data }: { data?: IncomeRecord[] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold" style={{ color: TEXT }}>Income Records</p>
        {data?.length ? (
          <button onClick={() => exportCsv(data)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: `${GREEN}20`, color: GREEN }}>
            Export CSV
          </button>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {['Order', 'Date', 'Customer', 'Amount', 'Status'].map(h => (
                <th key={h} className="text-left pb-3 pr-4 font-medium" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length ? data.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td className="py-3 pr-4 font-mono text-xs" style={{ color: AMBER_HEX }}>{r.order_key}</td>
                <td className="py-3 pr-4" style={{ color: MUTED }}>{r.placed_at.slice(0, 10)}</td>
                <td className="py-3 pr-4" style={{ color: MUTED }}>{r.guest_email}</td>
                <td className="py-3 pr-4 font-semibold" style={{ color: TEXT }}>{fmt(r.total_amount_gbp)}</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs capitalize"
                    style={{ background: `${GREEN}20`, color: GREEN }}>
                    {r.order_status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="py-8 text-center" style={{ color: MUTED }}>No income records</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
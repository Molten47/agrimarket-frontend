import { ExpenseRecord } from '@/api/bookkeeping.api'
import { Card, fmt, TEXT, MUTED, BORDER, ROSE, AMBER_HEX } from './tokens'

function exportCsv(data: ExpenseRecord[]) {
  const header = 'Date,Category,Description,Amount'
  const rows   = data.map(r => `${r.expense_date},${r.category},${r.description ?? ''},${fmt(r.amount_gbp)}`)
  const blob   = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
  const a      = document.createElement('a')
  a.href       = URL.createObjectURL(blob)
  a.download   = 'expenses.csv'
  a.click()
}

export function ExpensesTable({ data }: { data?: ExpenseRecord[] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold" style={{ color: TEXT }}>Expense Records</p>
        {data?.length ? (
          <button onClick={() => exportCsv(data)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: `${ROSE}20`, color: ROSE }}>
            Export CSV
          </button>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {['Date', 'Category', 'Description', 'Amount'].map(h => (
                <th key={h} className="text-left pb-3 pr-4 font-medium" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length ? data.map((r) => (
              <tr key={r.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td className="py-3 pr-4" style={{ color: MUTED }}>{r.expense_date}</td>
                <td className="py-3 pr-4">
                  <span className="px-2 py-0.5 rounded-full text-xs"
                    style={{ background: `${AMBER_HEX}20`, color: AMBER_HEX }}>{r.category}</span>
                </td>
                <td className="py-3 pr-4" style={{ color: MUTED }}>{r.description ?? '—'}</td>
                <td className="py-3 font-semibold" style={{ color: ROSE }}>{fmt(r.amount_gbp)}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="py-8 text-center" style={{ color: MUTED }}>No expenses recorded</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
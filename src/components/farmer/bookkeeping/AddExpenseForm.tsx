import { useState } from 'react'
import { CreateExpenseInput } from '@/api/bookkeeping.api'
import { Card, TEXT, MUTED, BORDER, AMBER_HEX } from './tokens'

const CATEGORIES = ['Seeds & Plants', 'Feed & Fertiliser', 'Fuel', 'Labour', 'Equipment', 'Packaging', 'Other']

const INPUT = { background: 'rgba(255,255,255,0.08)', border: `1px solid rgba(255,255,255,0.18)`, color: 'rgba(255,255,255,0.92)', height: 36, borderRadius: 8, padding: '0 12px', fontSize: 13 }

interface Props { onAdd: (input: CreateExpenseInput) => Promise<unknown>; isAdding: boolean }

export function AddExpenseForm({ onAdd, isAdding }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ amount_gbp: '', category: CATEGORIES[0], description: '', expense_date: new Date().toISOString().slice(0, 10) })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onAdd({ amount_gbp: Number(form.amount_gbp), category: form.category, description: form.description || undefined, expense_date: form.expense_date })
    setForm({ amount_gbp: '', category: CATEGORIES[0], description: '', expense_date: new Date().toISOString().slice(0, 10) })
    setOpen(false)
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} className="text-sm px-4 py-2 rounded-lg font-medium"
      style={{ background: AMBER_HEX, color: '#fff' }}>
      + Add Expense
    </button>
  )

  return (
    <Card>
      <p className="font-semibold mb-4" style={{ color: TEXT }}>New Expense</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: MUTED }}>Amount (£)</label>
          <input type="number" step="0.01" min="0.01" required style={INPUT}
            value={form.amount_gbp} onChange={e => setForm(f => ({ ...f, amount_gbp: e.target.value }))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: MUTED }}>Date</label>
          <input type="date" required style={INPUT}
            value={form.expense_date} onChange={e => setForm(f => ({ ...f, expense_date: e.target.value }))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: MUTED }}>Category</label>
          <select style={{ ...INPUT, appearance: 'none' as any }}
            value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {CATEGORIES.map(c => <option key={c} style={{ background: '#1a3a2e' }}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs" style={{ color: MUTED }}>Description (optional)</label>
          <input type="text" style={INPUT} placeholder="e.g. Diesel for tractor"
            value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="col-span-2 flex gap-3 pt-1">
          <button type="submit" disabled={isAdding} className="flex-1 h-9 rounded-lg text-sm font-semibold"
            style={{ background: AMBER_HEX, color: '#fff', opacity: isAdding ? 0.6 : 1 }}>
            {isAdding ? 'Saving...' : 'Save Expense'}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg text-sm"
            style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${BORDER}`, color: MUTED }}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  )
}
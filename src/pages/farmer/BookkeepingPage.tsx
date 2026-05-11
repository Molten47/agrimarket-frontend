import { useBookkeeping } from '@/hooks/useBookkeeping'
import { TEXT, MUTED } from '@/components/farmer/bookkeeping/tokens'
import { BookkeepingDatePicker }    from '@/components/farmer/bookkeeping/BookkeepingDatePicker'
import { BookkeepingSummaryCards }  from '@/components/farmer/bookkeeping/BookkeppingSummaryCards'
import { IncomeTable }              from '@/components/farmer/bookkeeping/IncomeTable'
import { ExpensesTable }            from '@/components/farmer/bookkeeping/ExpensesTable'
import { AddExpenseForm }           from '@/components/farmer/bookkeeping/AddExpenseForm'

export default function BookkeepingPage() {
  const { range, setRange, summary, income, expenses, addExpense } = useBookkeeping()

  return (
    <div className="space-y-6" style={{ color: TEXT }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2e]">Bookkeeping</h1>
          <p className="text-sm mt-0.5" style={{ color: '#1a3a2e' }}>Income, expenses and profit for your farm</p>
        </div>
        <AddExpenseForm
          onAdd={(input) => addExpense.mutateAsync(input)}
          isAdding={addExpense.isPending} />
      </div>

      <BookkeepingDatePicker range={range} onChange={setRange} />
      <BookkeepingSummaryCards data={summary.data} />
      <IncomeTable   data={income.data} />
      <ExpensesTable data={expenses.data} />
    </div>
  )
}
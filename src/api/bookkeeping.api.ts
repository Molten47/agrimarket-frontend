import { api } from '@/config/api'

export interface IncomeRecord {
  order_key:        string
  placed_at:        string
  guest_email:      string
  total_amount_gbp: string
  order_status:     string
}

export interface ExpenseRecord {
  id:           string
  amount_gbp:   string
  category:     string
  description:  string | null
  expense_date: string
}

export interface CreateExpenseInput {
  amount_gbp:   number
  category:     string
  description?: string
  expense_date: string
}

export interface BookkeepingSummary {
  total_income_gbp:   string
  total_expenses_gbp: string
  net_profit_gbp:     string
  order_count:        number
  expense_count:      number
  from:               string
  to:                 string
}

export interface DateRange { from: string; to: string }

export const bookkeepingApi = {
  summary:       (r: DateRange) => api.get<BookkeepingSummary>('/bookkeeping/summary',  { params: r }).then(d => d.data),
  income:        (r: DateRange) => api.get<IncomeRecord[]>('/bookkeeping/income',        { params: r }).then(d => d.data),
  expenses:      (r: DateRange) => api.get<ExpenseRecord[]>('/bookkeeping/expenses',     { params: r }).then(d => d.data),
  createExpense: (input: CreateExpenseInput) => api.post<ExpenseRecord>('/bookkeeping/expenses', input).then(d => d.data),
}
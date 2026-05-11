import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookkeepingApi, CreateExpenseInput, DateRange } from '@/api/bookkeeping.api'
import { subDays, format } from 'date-fns'

function defaultRange(): DateRange {
  const to   = format(new Date(), 'yyyy-MM-dd')
  const from = format(subDays(new Date(), 30), 'yyyy-MM-dd')
  return { from, to }
}

export function useBookkeeping() {
  const [range, setRange] = useState<DateRange>(defaultRange)
  const qc = useQueryClient()

  const summary  = useQuery({ queryKey: ['bk', 'summary',  range], queryFn: () => bookkeepingApi.summary(range)  })
  const income   = useQuery({ queryKey: ['bk', 'income',   range], queryFn: () => bookkeepingApi.income(range)   })
  const expenses = useQuery({ queryKey: ['bk', 'expenses', range], queryFn: () => bookkeepingApi.expenses(range) })

  const addExpense = useMutation({
    mutationFn: (input: CreateExpenseInput) => bookkeepingApi.createExpense(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bk'] }),
  })

  return { range, setRange, summary, income, expenses, addExpense }
}
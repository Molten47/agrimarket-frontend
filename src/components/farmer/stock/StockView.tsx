import { Stock, StockSummary } from '@/types'
import { StockPageHeader } from './StockPageHeader'
import { StockSummaryBar } from './StockSummaryBar'
import { StockList } from './StockList'

interface Props {
  stocks:      Stock[]
  summary:     StockSummary | undefined
  isLoading:   boolean
  editingSlug: string | null
  isUpdating:  boolean
  onEdit:      (slug: string) => void
  onSave:      (slug: string, qty: number, threshold: number) => void
  onCancel:    () => void
}

export function StockView({ stocks, summary, isLoading, editingSlug, isUpdating, onEdit, onSave, onCancel }: Props) {
  return (
    <div>
      <StockPageHeader total={stocks.length} />
      <StockSummaryBar summary={summary} />
      <StockList
        stocks={stocks}
        isLoading={isLoading}
        editingSlug={editingSlug}
        isUpdating={isUpdating}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  )
}

import { Stock } from '@/types'
import { StockRow } from './StockRow'

interface Props {
  stocks:      Stock[]
  isLoading:   boolean
  editingSlug: string | null
  isUpdating:  boolean
  onEdit:      (slug: string) => void
  onSave:      (slug: string, qty: number, threshold: number) => void
  onCancel:    () => void
}

export function StockList({ stocks, isLoading, editingSlug, isUpdating, onEdit, onSave, onCancel }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (stocks.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No stock records found. Add products first.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {stocks.map((s) => (
        <StockRow
          key={s.stock_id}
          stock={s}
          isEditing={editingSlug === s.product_slug}
          isUpdating={isUpdating}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      ))}
    </div>
  )
}

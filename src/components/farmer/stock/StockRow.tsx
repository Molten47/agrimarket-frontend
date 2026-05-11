import { Stock } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { StockEditForm } from './StockEditForm'

interface Props {
  stock:      Stock
  isEditing:  boolean
  isUpdating: boolean
  onEdit:     (slug: string) => void
  onSave:     (slug: string, qty: number, threshold: number) => void
  onCancel:   () => void
}

const statusColor: Record<string, string> = {
  in_stock:     'bg-green-100 text-green-800',
  low_stock:    'bg-amber-100 text-amber-800',
  out_of_stock: 'bg-red-100 text-red-800',
}

export function StockRow({ stock, isEditing, isUpdating, onEdit, onSave, onCancel }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{stock.product_name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Available: {stock.quantity_available} · Reserved: {stock.quantity_reserved} · Threshold: {stock.low_stock_threshold}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColor[stock.stock_status]}>
            {stock.stock_status.replace('_', ' ')}
          </Badge>
          <Button variant="ghost" size="icon" onClick={() => onEdit(stock.product_slug)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isEditing && (
        <StockEditForm stock={stock} isUpdating={isUpdating} onSave={onSave} onCancel={onCancel} />
      )}
    </div>
  )
}

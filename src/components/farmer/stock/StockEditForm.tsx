import { Stock } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface Props {
  stock:      Stock
  isUpdating: boolean
  onSave:     (slug: string, qty: number, threshold: number) => void
  onCancel:   () => void
}

export function StockEditForm({ stock, isUpdating, onSave, onCancel }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    onSave(
      stock.product_slug,
      Number(form.get('quantity_available')),
      Number(form.get('low_stock_threshold')),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3 mt-3 p-3 bg-muted/50 rounded-lg">
      <div className="space-y-1">
        <Label className="text-xs">Quantity Available</Label>
        <Input
          name="quantity_available"
          type="number"
          step="0.001"
          defaultValue={stock.quantity_available}
          className="h-8 w-32"
          required
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Low Stock Alert At</Label>
        <Input
          name="low_stock_threshold"
          type="number"
          step="0.001"
          defaultValue={stock.low_stock_threshold}
          className="h-8 w-32"
          required
        />
      </div>
      <Button type="submit" size="sm" disabled={isUpdating}>
        {isUpdating ? 'Saving...' : 'Save'}
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  )
}

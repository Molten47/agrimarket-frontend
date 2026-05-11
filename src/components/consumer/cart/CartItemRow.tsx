import { CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'

interface Props {
  item:       CartItem
  onRemove:   (productId: string) => void
  onUpdate:   (productId: string, quantity: number) => void
  isRemoving: boolean
}

export function CartItemRow({ item, onRemove, onUpdate, isRemoving }: Props) {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🌱</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.product_name}</p>
        <p className="text-xs text-muted-foreground">{item.farm_name}</p>
        <p className="text-xs text-muted-foreground">
          £{Number(item.price_per_unit).toFixed(2)} / {item.unit}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0.001"
          step="0.001"
          defaultValue={item.quantity}
          className="w-20 h-8 text-sm"
          onBlur={(e) => {
            const val = Number(e.target.value)
            if (val > 0) onUpdate(item.product_id, val)
          }}
        />
        <span className="text-sm font-semibold w-20 text-right">
          £{Number(item.line_total).toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          disabled={isRemoving}
          onClick={() => onRemove(item.product_id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
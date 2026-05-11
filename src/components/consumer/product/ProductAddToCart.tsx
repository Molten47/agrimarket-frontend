import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart } from 'lucide-react'
import { StockStatus } from '@/types'

interface Props {
  unit:        string
  stockStatus: StockStatus
  isAdding:    boolean
  onAdd:       (quantity: number) => void
}

export function ProductAddToCart({ unit, stockStatus, isAdding, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1)
  const isOutOfStock = stockStatus === 'out_of_stock'

  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-1">
        <Label htmlFor="quantity">Quantity ({unit})</Label>
        <Input
          id="quantity"
          type="number"
          min="0.001"
          step="0.001"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-32"
          disabled={isOutOfStock}
        />
      </div>

      <Button
        className="w-full md:w-auto"
        disabled={isOutOfStock || isAdding || quantity <= 0}
        onClick={() => onAdd(quantity)}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {isOutOfStock ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  )
}
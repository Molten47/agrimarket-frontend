import { CartItem } from '@/types'
import { CartItemRow } from './CartItemRow'

interface Props {
  items:      CartItem[]
  isRemoving: boolean
  onRemove:   (productId: string) => void
  onUpdate:   (productId: string, quantity: number) => void
}

export function CartItemList({ items, isRemoving, onRemove, onUpdate }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg mb-2">Your cart is empty</p>
        <p className="text-sm">Add some fresh produce to get started.</p>
      </div>
    )
  }

  return (
    <div>
      {items.map((item) => (
        <CartItemRow
          key={item.product_id}
          item={item}
          isRemoving={isRemoving}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
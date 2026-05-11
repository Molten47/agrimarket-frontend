import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Props {
  itemCount: number
  onClear:   () => void
}

export function CartHeader({ itemCount, onClear }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-sm text-muted-foreground">
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </p>
      </div>
      {itemCount > 0 && (
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear cart
        </Button>
      )}
    </div>
  )
}
import { Plus } from 'lucide-react'

interface Props {
  count:      number
  onAddClick: () => void
}

export function ProductsHeader({ count, onAddClick }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-muted-foreground">
          {count} product{count !== 1 ? 's' : ''} listed
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
        style={{ background: 'oklch(0.62 0.16 40)', color: '#fff' }}
      >
        <Plus className="h-4 w-4" />
        Add Product
      </button>
    </div>
  )
}
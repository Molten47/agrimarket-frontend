import { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Props {
  products:  Product[]
  isLoading: boolean
  onDelete:  (slug: string) => void
}

const statusColor: Record<string, string> = {
  in_stock:     'bg-green-100 text-green-800',
  low_stock:    'bg-amber-100 text-amber-800',
  out_of_stock: 'bg-red-100 text-red-800',
}

export function ProductsTable({ products, isLoading, onDelete }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No products yet. Add your first product to start selling.
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3">Product</th>
            <th className="text-left px-4 py-3">Category</th>
            <th className="text-left px-4 py-3">Price</th>
            <th className="text-left px-4 py-3">Stock</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-muted/40 transition-colors">
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {p.category_name ?? '—'}
              </td>
              <td className="px-4 py-3">
                £{Number(p.price_per_unit).toFixed(2)}/{p.unit}
              </td>
              <td className="px-4 py-3">
                <Badge className={statusColor[p.stock_status]}>
                  {p.stock_status.replace('_', ' ')}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(p.slug)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
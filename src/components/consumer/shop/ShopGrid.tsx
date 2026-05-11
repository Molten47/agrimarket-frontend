import { Product } from '@/types'
import { ProductCard } from '../ProductCard'

interface Props {
  products:      Product[]
  isLoading:     boolean
  isError:       boolean
  onAddToCart:   (product: Product) => void
}

export function ShopGrid({ products, isLoading, isError, onAddToCart }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-72 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Failed to load products. Please try again.
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No products found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
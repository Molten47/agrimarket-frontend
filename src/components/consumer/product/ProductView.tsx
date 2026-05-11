import { Product } from '@/types'
import { ProductBreadcrumb } from './ProductBreadcrumb'
import { ProductImagePanel } from './ProductImagePanel'
import { ProductInfo } from './ProductInfo'
import { ProductAddToCart } from './ProductAddToCart'
import { Separator } from '@/components/ui/separator'

interface Props {
  product:   Product | undefined
  isLoading: boolean
  isError:   boolean
  isAdding:  boolean
  onAdd:     (quantity: number) => void
}

export function ProductView({ product, isLoading, isError, isAdding, onAdd }: Props) {
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-xl bg-muted animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Product not found.
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProductBreadcrumb
        categoryName={product.category_name}
        productName={product.name}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImagePanel productName={product.name} imageUrl={product.image_url ?? null} />
        <div className="space-y-6">
          <ProductInfo product={product} />
          <Separator />
          <ProductAddToCart
            unit={product.unit}
            stockStatus={product.stock_status}
            isAdding={isAdding}
            onAdd={onAdd}
          />
        </div>
      </div>
    </div>
  )
}
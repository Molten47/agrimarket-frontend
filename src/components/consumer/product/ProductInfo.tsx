import { MapPin } from 'lucide-react'
import { Product } from '@/types'
import { ProductStockBadge } from './ProductStockBadge'

interface Props {
  product: Product
}

export function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-3">
      {product.category_name && (
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category_name}
        </p>
      )}

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div className="flex items-center gap-3">
        <ProductStockBadge status={product.stock_status} />
        <span className="text-xs text-muted-foreground">
          {product.quantity_available} {product.unit} available
        </span>
      </div>

      <p className="text-3xl font-bold">
        £{Number(product.price_per_unit).toFixed(2)}
        <span className="text-base font-normal text-muted-foreground ml-2">
          per {product.unit}
        </span>
      </p>

      {product.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
        <MapPin className="h-4 w-4" />
        <span>{product.farm_name} · {product.county}</span>
      </div>
    </div>
  )
}
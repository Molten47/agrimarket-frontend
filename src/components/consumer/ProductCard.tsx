import { Link } from 'react-router-dom'
import { MapPin, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  product:        Product
  onAddToCart?:   (product: Product) => void
  isAddingToCart?: boolean
}

const statusConfig = {
  in_stock:     { label: 'In Stock',     cls: 'bg-green-100 text-green-800 border-green-200' },
  low_stock:    { label: 'Low Stock',    cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  out_of_stock: { label: 'Out of Stock', cls: 'bg-red-100   text-red-800   border-red-200'   },
}

export function ProductCard({ product, onAddToCart, isAddingToCart }: Props) {
  const status    = statusConfig[product.stock_status]
  const outOfStock = product.stock_status === 'out_of_stock'

  return (
    <div className="flex flex-col rounded-xl border bg-card overflow-hidden transition-shadow duration-200 hover:shadow-md">

    
       {/* Image area */}
      <Link to={`/products/${product.slug}`}>
        <div className="h-44 bg-muted/60 flex items-center justify-center relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">🌱</span>
          )}
          <div className="absolute top-2.5 right-2.5">
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', status.cls)}>
              {status.label}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Category */}
        {product.category_name && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {product.category_name}
          </p>
        )}

        {/* Name */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Farm */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{product.farm_name} · {product.county}</span>
        </div>

        {/* Price */}
        <p className="font-bold text-base mt-auto">
          £{Number(product.price_per_unit).toFixed(2)}
          <span className="text-xs font-normal text-muted-foreground ml-1">/ {product.unit}</span>
        </p>

        {/* CTA */}
        <button
          disabled={outOfStock || isAddingToCart}
          onClick={() => onAddToCart?.(product)}
          className="w-full h-9 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          style={{
            background: outOfStock ? '#d1d5db' : 'oklch(0.62 0.16 40)',
            color: outOfStock ? '#6b7280' : '#fff',
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          {outOfStock ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
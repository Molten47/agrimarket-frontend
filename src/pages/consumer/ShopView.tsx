import { Product, Category } from '@/types'
import { ListProductsParams } from '@/api/products.api'
import { ShopHeader } from '@/components/consumer/shop/ShopHeader'
import { ShopFilters } from '@/components/consumer/shop/ShopFilters'
import { ShopGrid } from '@/components/consumer/shop/ShopGrid'
import { ShopPagination } from '@/components/consumer/shop/ShopPagination'

interface Props {
  products:      Product[]
  categories:    Category[]
  filters:       ListProductsParams
  total:         number
  totalPages:    number
  isLoading:     boolean
  isError:       boolean
  onAddToCart:   (product: Product) => void
  onSearch:      (v: string) => void
  onCategory:    (v: string | undefined) => void
  onCounty:      (v: string | undefined) => void
  onStockStatus: (v: string | undefined) => void
  onPageChange:  (v: number) => void
}

export function ShopView({
  products, categories, filters, total, totalPages,
  isLoading, isError, onAddToCart,
  onSearch, onCategory, onStockStatus, onPageChange,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ShopHeader total={total} />
      <ShopFilters
        categories={categories}
        activeCategory={filters.category_slug}
        onSearch={onSearch}
        onCategory={onCategory}
        onStockStatus={onStockStatus}
      />
      <ShopGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        onAddToCart={onAddToCart}
      />
      <ShopPagination
        page={filters.page ?? 1}
        totalPages={totalPages}
        onPage={onPageChange}
      />
    </div>
  )
}
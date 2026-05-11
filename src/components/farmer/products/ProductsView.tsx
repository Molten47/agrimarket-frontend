import { Product, Category, CreateProductInput } from '@/types'
import { ProductsHeader } from './ProductsHeader'
import { ProductsTable } from './ProductsTable'
import { ProductFormSheet } from './ProductFormSheet'

interface Props {
  products:   Product[]
  categories: Category[]
  isLoading:  boolean
  isFormOpen: boolean
  isCreating: boolean
  onAddClick: () => void
  onCreate:   (input: CreateProductInput) => void
  onDelete:   (slug: string) => void
  onClose:    () => void
}

export function ProductsView({
  products, categories, isLoading,
  isFormOpen, isCreating,
  onAddClick, onCreate, onDelete, onClose,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, imageUrl: string | null) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    onCreate({
      name:                form.get('name') as string,
      description:         form.get('description') as string || undefined,
      price_per_unit:      Number(form.get('price_per_unit')),
      unit:                form.get('unit') as string,
      category_id:         form.get('category_id') as string || undefined,
      quantity_available:  Number(form.get('quantity_available')),
      low_stock_threshold: Number(form.get('low_stock_threshold')) || undefined,
      image_url:           imageUrl ?? undefined,
    })
  }

  return (
    <div>
      <ProductsHeader count={products.length} onAddClick={onAddClick} />
      <ProductsTable
        products={products}
        isLoading={isLoading}
        onDelete={onDelete}
      />
      <ProductFormSheet
        open={isFormOpen}
        categories={categories}
        isLoading={isCreating}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  )
}
import { useProducts } from '@/hooks/useProducts'
import { ProductsView } from '@/components/farmer/products/ProductsView'
export default function ProductsPage() {
  const { products, categories, isLoading, isFormOpen, isCreating, setIsFormOpen, onCreate, onDelete } = useProducts()
  return (
    <ProductsView
      products={products} categories={categories} isLoading={isLoading}
      isFormOpen={isFormOpen} isCreating={isCreating}
      onAddClick={() => setIsFormOpen(true)} onCreate={onCreate}
      onDelete={onDelete} onClose={() => setIsFormOpen(false)}
    />
  )
}

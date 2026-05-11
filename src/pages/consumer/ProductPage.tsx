import { useProduct } from '@/hooks/useProduct'
import { ProductView } from '@/components/consumer/product/ProductView'
export default function ProductPage() {
  const { product, isLoading, isError, onAddToCart, isAdding } = useProduct()
  return <ProductView product={product} isLoading={isLoading} isError={isError} isAdding={isAdding} onAdd={onAddToCart} />
}

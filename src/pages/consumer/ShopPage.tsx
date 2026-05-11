import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useShop } from '@/hooks/useShop'
import { ShopView } from './ShopView'
import { cartApi } from '@/api/cart.api'
import { useCartStore } from '@/store/cart.store'
import { Product } from '@/types'

export default function ShopPage() {
  const queryClient = useQueryClient()
  const { sessionKey, setCart } = useCartStore()
  const shop = useShop()
  const addToCart = useMutation({
    mutationFn: (product: Product) =>
      cartApi.addItem(sessionKey, { product_id: product.id, quantity: 1 }),
    onSuccess: async () => {
      const cart = await cartApi.get(sessionKey)
      setCart(cart)
      toast.success('Added to cart')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => toast.error('Could not add to cart'),
  })
  return (
    <ShopView
      {...shop}
      onAddToCart={(p) => addToCart.mutate(p)}
      onSearch={shop.setSearch}
      onCategory={shop.setCategory}
      onCounty={shop.setCounty}
      onStockStatus={shop.setStockStatus}
      onPageChange={shop.setPage}
    />
  )
}

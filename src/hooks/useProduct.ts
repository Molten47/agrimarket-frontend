import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productsApi } from '@/api/products.api'
import { cartApi } from '@/api/cart.api'
import { useCartStore } from '@/store/cart.store'

export function useProduct() {
  const { slug } = useParams<{ slug: string }>()
  const queryClient = useQueryClient()
  const { sessionKey, setCart } = useCartStore()

  const productQuery = useQuery({
    queryKey: ['product', slug],
    queryFn:  () => productsApi.get(slug!),
    enabled:  !!slug,
  })

  const addToCart = useMutation({
    mutationFn: (quantity: number) =>
      cartApi.addItem(sessionKey, {
        product_id: productQuery.data!.id,
        quantity,
      }),
    onSuccess: async () => {
      const cart = await cartApi.get(sessionKey)
      setCart(cart)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Added to cart')
    },
    onError: () => toast.error('Could not add to cart'),
  })

  return {
    product:     productQuery.data,
    isLoading:   productQuery.isLoading,
    isError:     productQuery.isError,
    onAddToCart: addToCart.mutate,
    isAdding:    addToCart.isPending,
  }
}
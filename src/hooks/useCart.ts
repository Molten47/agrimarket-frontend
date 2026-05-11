import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cartApi } from '@/api/cart.api'
import { useCartStore } from '@/store/cart.store'

export function useCart() {
  const queryClient = useQueryClient()
  const { sessionKey, setCart, clearCart } = useCartStore()

  const cartQuery = useQuery({
    queryKey: ['cart', sessionKey],
    queryFn:  () => cartApi.get(sessionKey),
  })

  // v5 removed onSuccess from useQuery — sync store via useEffect instead
  useEffect(() => {
    if (cartQuery.data) {
      setCart(cartQuery.data)
    }
  }, [cartQuery.data])

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      cartApi.removeItem(sessionKey, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Item removed')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: {
      productId: string
      quantity:  number
    }) => cartApi.updateItem(sessionKey, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => toast.error('Could not update quantity'),
  })

  const clearMutation = useMutation({
    mutationFn: () => cartApi.clear(sessionKey),
    onSuccess: () => {
      clearCart()
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Cart cleared')
    },
  })

  return {
    cart:       cartQuery.data,
    isLoading:  cartQuery.isLoading,
    onRemove:   removeMutation.mutate,
    onUpdate:   updateMutation.mutate,
    onClear:    clearMutation.mutate,
    isRemoving: removeMutation.isPending,
    isUpdating: updateMutation.isPending,
  }
}
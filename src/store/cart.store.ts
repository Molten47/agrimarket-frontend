import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart } from '@/types'
import { getSessionKey } from '@/config'

// ── State shape ───────────────────────────────────────────────────────────────

interface CartState {
  sessionKey: string
  cart: Cart | null
  itemCount: number

  // Actions
  setCart: (cart: Cart) => void
  clearCart: () => void
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      sessionKey: getSessionKey(),
      cart: null,
      itemCount: 0,

      setCart: (cart) =>
        set({
          cart,
          itemCount: cart.item_count,
        }),

      clearCart: () =>
        set({
          cart: null,
          itemCount: 0,
        }),
    }),
    {
      name: 'agrimarket_cart',
      partialize: (state) => ({
        sessionKey: state.sessionKey,
        itemCount: state.itemCount,
      }),
    }
  )
)
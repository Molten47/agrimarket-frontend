import { api } from '@/config/api'
import { Cart } from '@/types'

export const cartApi = {
  get: async (sessionKey: string): Promise<Cart> => {
    const { data } = await api.get(`/cart/${sessionKey}`)
    return data
  },

  addItem: async (
    sessionKey: string,
    input: { product_id: string; quantity: number }
  ): Promise<void> => {
    await api.post(`/cart/${sessionKey}/items`, input)
  },

  updateItem: async (
    sessionKey: string,
    productId: string,
    quantity: number
  ): Promise<void> => {
    await api.patch(`/cart/${sessionKey}/items/${productId}`, { quantity })
  },

  removeItem: async (
    sessionKey: string,
    productId: string
  ): Promise<void> => {
    await api.delete(`/cart/${sessionKey}/items/${productId}`)
  },

  clear: async (sessionKey: string): Promise<void> => {
    await api.delete(`/cart/${sessionKey}`)
  },
}
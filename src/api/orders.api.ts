import { api } from '@/config/api'
import { Order, PlaceOrderInput, PaginatedResponse } from '@/types'

export const ordersApi = {
  place: async (input: PlaceOrderInput): Promise<{
    id: string
    order_key: string
    total_gbp: string
    message: string
  }> => {
    const { data } = await api.post('/orders', input)
    return data
  },

  get: async (orderId: string, orderKey: string): Promise<Order> => {
    const { data } = await api.get(`/orders/${orderId}`, {
      params: { order_key: orderKey },
    })
    return data
  },

  list: async (params?: {
    page?: number
    per_page?: number
    order_status?: string
  }): Promise<PaginatedResponse<Order>> => {
    const { data } = await api.get('/orders', { params })
    return data
  },

  updateStatus: async (
    orderId: string,
    order_status: string
  ): Promise<void> => {
    await api.patch(`/orders/${orderId}/status`, { order_status })
  },
}
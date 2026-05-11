import { api } from '@/config/api'
import { Stock, StockOverview } from '@/types'

export const stockApi = {
  list: async (): Promise<StockOverview> => {
    const { data } = await api.get('/stock')
    return data
  },

  get: async (productSlug: string): Promise<Stock> => {
    const { data } = await api.get(`/stock/${productSlug}`)
    return data
  },

  update: async (
    productSlug: string,
    input: {
      quantity_available?: number
      low_stock_threshold?: number
    }
  ): Promise<Stock> => {
    const { data } = await api.patch(`/stock/${productSlug}`, input)
    return data
  },
}
import { api } from '@/config/api'
import { Product, CreateProductInput, PaginatedResponse } from '@/types'

export interface ListProductsParams {
  page?: number
  per_page?: number
  category_slug?: string
  county?: string
  stock_status?: string
  search?: string
}

export const productsApi = {
  list: async (
    params?: ListProductsParams
  ): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get('/products', { params })
    return data
  },

  get: async (slug: string): Promise<Product> => {
    const { data } = await api.get(`/products/${slug}`)
    return data
  },

  create: async (input: CreateProductInput): Promise<{
    id: string
    slug: string
    message: string
  }> => {
    const { data } = await api.post('/products', input)
    return data
  },

  update: async (
    slug: string,
    input: Partial<CreateProductInput>
  ): Promise<void> => {
    await api.patch(`/products/${slug}`, input)
  },

  delete: async (slug: string): Promise<void> => {
    await api.delete(`/products/${slug}`)
  },
}
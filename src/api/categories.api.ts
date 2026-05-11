import { api } from '@/config/api'
import { Category } from '@/types'

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const { data } = await api.get('/categories')
    return data
  },

  get: async (slug: string): Promise<Category> => {
    const { data } = await api.get(`/categories/${slug}`)
    return data
  },
}
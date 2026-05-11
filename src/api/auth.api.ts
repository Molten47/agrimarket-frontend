import { api } from '@/config/api'
import { AuthResponse, AuthTokens } from '@/types'

export const authApi = {
  register: async (input: {
    email: string
    password: string
    farm_name: string
    full_name: string
    phone?: string
    county: string
    postcode: string
    bio?: string
  }): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', input)
    return data
  },

  login: async (input: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', input)
    return data
  },

  refresh: async (refresh_token: string): Promise<{ tokens: AuthTokens }> => {
    const { data } = await api.post('/auth/refresh', { refresh_token })
    return data
  },

  logout: async (input: {
    jti: string
    access_exp: number
    refresh_token?: string
  }): Promise<void> => {
    await api.post('/auth/logout', input)
  },
}
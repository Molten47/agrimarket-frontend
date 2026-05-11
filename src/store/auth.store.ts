import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Farmer } from '@/types'

// ── State shape ───────────────────────────────────────────────────────────────

interface AuthState {
  farmer: Farmer | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean

  // Actions
  setAuth: (farmer: Farmer, accessToken: string, refreshToken: string) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      farmer: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Called after login or register — sets everything
      setAuth: (farmer, accessToken, refreshToken) =>
        set({
          farmer,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // Called after silent token refresh — updates tokens only
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      // Called on logout or compromise detection — wipes everything
      logout: () =>
        set({
          farmer: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'agrimarket_auth',
      // Only persist these fields — never persist sensitive computed state
      partialize: (state) => ({
        farmer: state.farmer,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
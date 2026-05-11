// Persists the most recent guest order so the navbar can show a Track link.
// Cleared when the user explicitly dismisses it or places a new order.

const KEY = 'agrimarket_last_order'

export interface LastOrder {
  id:  string
  key: string
}

export function saveLastOrder(order: LastOrder) {
  localStorage.setItem(KEY, JSON.stringify(order))
}

export function getLastOrder(): LastOrder | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearLastOrder() {
  localStorage.removeItem(KEY)
}
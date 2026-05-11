export const SESSION_KEY_STORAGE = 'agrimarket_session_key'
export const CART_SESSION_KEY    = 'agrimarket_cart_session'

// Generates or retrieves a stable guest session key
export function getSessionKey(): string {
  let key = localStorage.getItem(SESSION_KEY_STORAGE)
  if (!key) {
    key = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY_STORAGE, key)
  }
  return key
}
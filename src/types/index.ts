// ── Auth ──────────────────────────────────────────────────────────────────────

export interface Farmer {
  id: string
  email: string
  farm_name: string
  full_name: string
  county: string
  postcode: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export interface AuthResponse {
  farmer: Farmer
  tokens: AuthTokens
}

// ── Products ──────────────────────────────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface Product {
  id: string
  slug: string
  name: string
  description: string | null
  price_per_unit: string
  unit: string
  category_slug: string | null
  category_name: string | null
  farmer_id: string
  farm_name: string
  county: string
  stock_status: StockStatus
  quantity_available: string
  created_at: string
  image_url: string | null 
}

export interface CreateProductInput {
  name: string
  description?: string
  price_per_unit: number
  unit: string
  category_id?: string
  quantity_available: number
  low_stock_threshold?: number
  image_url?: string 
}

// ── Categories ────────────────────────────────────────────────────────────────

export interface CategoryChild {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  children: CategoryChild[]
}

// ── Stock ─────────────────────────────────────────────────────────────────────

export interface Stock {
  stock_id: string
  product_id: string
  product_name: string
  product_slug: string
  quantity_available: string
  quantity_reserved: string
  low_stock_threshold: string
  stock_status: StockStatus
  updated_at: string
}

export interface StockSummary {
  total: number
  in_stock: number
  low_stock: number
  out_of_stock: number
}

export interface StockOverview {
  data: Stock[]
  summary: StockSummary
}

// ── Cart ──────────────────────────────────────────────────────────────────────

export interface CartItem {
  product_id: string
  product_name: string
  product_slug: string
  farm_name: string
  unit: string
  quantity: string
  price_per_unit: string
  line_total: string
  stock_status: StockStatus
}

export interface Cart {
  cart_id: string
  session_key: string
  items: CartItem[]
  total: string
  item_count: number
  expires_at: string
}

// ── Orders ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface OrderItem {
  product_id: string
  product_name: string
  product_slug: string
  quantity: string
  unit_price_gbp: string
  line_total_gbp: string
}

export interface Order {
  id: string
  order_key: string
  order_status: OrderStatus
  payment_status: PaymentStatus
  guest_email: string
  delivery_name: string
  delivery_address: string
  delivery_county: string
  delivery_postcode: string
  total_gbp: string
  total_amount_gbp?: string  // actual backend field name
  // ...
  items: OrderItem[]
  placed_at: string
}

export interface PlaceOrderInput {
  order_key: string
  session_key: string
  guest_email: string
  delivery_name: string
  delivery_address: string
  delivery_county: string
  delivery_postcode: string
}

// ── Tracking ──────────────────────────────────────────────────────────────────

export interface TrackingEvent {
  id: string
  order_id: string
  status: string
  location_label: string | null
  lat: string | null
  lng: string | null
  event_time: string
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  per_page: number
  total: number
  total_pages: number
}

// ── API Error ─────────────────────────────────────────────────────────────────

export interface ApiError {
  error: string
  code: string
  status: number
}
import { api } from '@/config/api'

export interface SummaryResponse {
  total_revenue_gbp:   string
  total_orders:        number
  average_order_value: string
  total_products:      number
  low_stock_count:     number
  out_of_stock_count:  number
  period_days:         number
}

export interface RevenuePoint {
  date:        string
  revenue_gbp: string
  orders:      number
}

export interface TopProduct {
  product_name:  string
  product_slug:  string
  total_revenue: string
  units_sold:    string
  order_count:   number
}

export interface RevenueResponse {
  chart:        RevenuePoint[]
  top_products: TopProduct[]
}

export interface StockItem {
  product_name:        string
  product_slug:        string
  quantity_available:  string
  quantity_reserved:   string
  low_stock_threshold: string
  stock_status:        string
  units_sold_30d:      string
}

export interface CustomerMetrics {
  unique_customers: number
  repeat_customers: number
  top_counties:     { county: string; orders: number }[]
  peak_hours:       { hour: number; orders: number }[]
}

export type Period = '7d' | '30d' | '90d' | '365d'

export const analyticsApi = {
  summary:   (period: Period) => api.get<SummaryResponse>('/analytics/summary',   { params: { period } }).then(r => r.data),
  revenue:   (period: Period) => api.get<RevenueResponse>('/analytics/revenue',   { params: { period } }).then(r => r.data),
  stock:     ()               => api.get<StockItem[]>('/analytics/stock').then(r => r.data),
  customers: (period: Period) => api.get<CustomerMetrics>('/analytics/customers', { params: { period } }).then(r => r.data),
}
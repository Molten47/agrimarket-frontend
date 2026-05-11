import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productsApi, ListProductsParams } from '@/api/products.api'
import { categoriesApi } from '@/api/categories.api'

export function useShop() {
  const [filters, setFilters] = useState<ListProductsParams>({
    page: 1,
    per_page: 20,
    category_slug: undefined,
    county: undefined,
    stock_status: undefined,
    search: undefined,
  })

  const productsQuery = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
    staleTime: 1000 * 60 * 10, // 10 min — categories rarely change
  })

  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search: search || undefined, page: 1 }))

  const setCategory = (category_slug: string | undefined) =>
    setFilters((f) => ({ ...f, category_slug, page: 1 }))

  const setCounty = (county: string | undefined) =>
    setFilters((f) => ({ ...f, county, page: 1 }))

  const setStockStatus = (stock_status: string | undefined) =>
    setFilters((f) => ({ ...f, stock_status, page: 1 }))

  const setPage = (page: number) =>
    setFilters((f) => ({ ...f, page }))

  return {
    // Data
    products:    productsQuery.data?.data ?? [],
    total:       productsQuery.data?.total ?? 0,
    totalPages:  productsQuery.data?.total_pages ?? 1,
    categories:  categoriesQuery.data ?? [],
    // State
    filters,
    isLoading:   productsQuery.isLoading,
    isError:     productsQuery.isError,
    // Actions
    setSearch,
    setCategory,
    setCounty,
    setStockStatus,
    setPage,
  }
}
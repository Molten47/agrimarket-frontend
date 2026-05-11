import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Category } from '@/types'

interface Props {
  categories:     Category[]
  activeCategory: string | undefined
  onSearch:       (v: string) => void
  onCategory:     (v: string | undefined) => void
  onStockStatus:  (v: string | undefined) => void
}

export function ShopFilters({
  categories, activeCategory,
  onSearch, onCategory, onStockStatus,
}: Props) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 h-11"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Category */}
        <Select onValueChange={(v) => onCategory(v === 'all' ? undefined : v)}>
          <SelectTrigger className="w-full md:w-48 h-11 bg-background border-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability */}
        <Select onValueChange={(v) => onStockStatus(v === 'all' ? undefined : v)}>
          <SelectTrigger className="w-full md:w-44 h-11 bg-background border-border">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
          </SelectContent>
        </Select>

      </div>

      {/* Active filter pill */}
      {activeCategory && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtering by:</span>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => onCategory(undefined)}
          >
            {activeCategory} ×
          </Badge>
        </div>
      )}
    </div>
  )
}
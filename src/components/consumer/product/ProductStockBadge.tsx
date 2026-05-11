import { Badge } from '@/components/ui/badge'
import { StockStatus } from '@/types'

interface Props {
  status: StockStatus
}

const config: Record<StockStatus, { label: string; className: string }> = {
  in_stock:     { label: 'In Stock',     className: 'bg-green-100 text-green-800' },
  low_stock:    { label: 'Low Stock',    className: 'bg-amber-100 text-amber-800' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-800'   },
}

export function ProductStockBadge({ status }: Props) {
  const { label, className } = config[status]
  return <Badge className={className}>{label}</Badge>
}
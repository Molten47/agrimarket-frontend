import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Props {
  categoryName: string | null
  productName:  string
}

export function ProductBreadcrumb({ categoryName, productName }: Props) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-foreground transition-colors">Shop</Link>
      {categoryName && (
        <>
          <ChevronRight className="h-3 w-3" />
          <span>{categoryName}</span>
        </>
      )}
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground truncate">{productName}</span>
    </nav>
  )
}
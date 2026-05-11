import { Button } from '@/components/ui/button'

interface Props {
  page:       number
  totalPages: number
  onPage:     (page: number) => void
}

export function ShopPagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline" size="sm"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline" size="sm"
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
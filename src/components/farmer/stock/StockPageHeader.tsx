interface Props {
  total: number
}

export function StockPageHeader({ total }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Stock Management</h1>
      <p className="text-sm text-muted-foreground">
        {total} product{total !== 1 ? 's' : ''} tracked
      </p>
    </div>
  )
}

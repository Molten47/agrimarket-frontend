interface Props {
  total: number
}

export function ShopHeader({ total }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-1">Fresh from the Farm</h1>
      <p className="text-muted-foreground">
        Sourced directly from rural UK farmers — no middlemen.
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {total} product{total !== 1 ? 's' : ''} available
      </p>
    </div>
  )
}
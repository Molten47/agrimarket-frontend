const statuses = ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled']

interface Props {
  total:          number
  onStatusFilter: (v: string | undefined) => void
}

export function OrdersHeader({ total, onStatusFilter }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          {total > 0 ? `${total} order${total !== 1 ? 's' : ''}` : 'No orders yet'}
        </p>
      </div>
      <select
        onChange={e => onStatusFilter(e.target.value === 'all' ? undefined : e.target.value)}
        className="text-sm font-medium rounded-lg px-3 py-2 pr-8 cursor-pointer transition-all"
        style={{
          appearance:          'none',
          background:          'oklch(0.62 0.16 40)',
          color:               '#fff',
          border:              'none',
          backgroundImage:     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat:    'no-repeat',
          backgroundPosition:  'right 0.6rem center',
        }}
      >
        <option value="all" style={{ background: '#1a3a2e' }}>Filter status</option>
        {statuses.map(s => (
          <option key={s} value={s} style={{ background: '#1a3a2e' }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
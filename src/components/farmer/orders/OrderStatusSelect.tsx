const transitions: Record<string, string[]> = {
  pending:    ['confirmed', 'cancelled'],
  confirmed:  ['processing', 'cancelled'],
  processing: ['dispatched', 'cancelled'],
  dispatched: ['delivered'],
  delivered:  [],
  cancelled:  [],
}

interface Props {
  orderId:    string
  current:    string
  isUpdating: boolean
  onUpdate:   (orderId: string, status: string) => void
}

export function OrderStatusSelect({ orderId, current, isUpdating, onUpdate }: Props) {
  const options = transitions[current] ?? []

  if (options.length === 0) return null

  return (
    <select
      disabled={isUpdating}
      onChange={(e) => {
        if (e.target.value) onUpdate(orderId, e.target.value)
      }}
      defaultValue=""
      style={{
        appearance: 'none',
        background: 'white',
        border: '1px solid #d1cfc9',
        borderRadius: '0.5rem',
        padding: '0.3rem 2rem 0.3rem 0.6rem',
        fontSize: '0.75rem',
        color: '#374151',
        cursor: isUpdating ? 'not-allowed' : 'pointer',
        opacity: isUpdating ? 0.5 : 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
      }}
    >
      <option value="" disabled>Move to...</option>
      {options.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  )
}
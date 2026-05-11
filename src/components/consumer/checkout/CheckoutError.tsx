interface Props {
  error: string | null
}

export function CheckoutError({ error }: Props) {
  if (!error) return null

  return (
    <div style={{
      background: 'rgba(220,38,38,0.15)',
      border: '1px solid rgba(220,38,38,0.3)',
      borderRadius: '0.5rem',
      padding: '0.5rem 0.75rem',
    }}>
      <p style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{error}</p>
    </div>
  )
}
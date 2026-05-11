import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Package } from 'lucide-react'

export function ConfirmationActions() {
  const { id }         = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const orderKey       = searchParams.get('key') ?? ''

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      {id && orderKey && (
        <Link to={`/order/${id}/tracking?key=${orderKey}`}>
          <button
            className="w-full sm:w-auto px-8 h-10 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 inline-flex items-center gap-2 justify-center"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            <Package size={15} /> Track your order
          </button>
        </Link>
      )}
      <Link to="/shop">
        <button
          className="w-full sm:w-auto px-8 h-10 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'oklch(0.62 0.16 40)', color: '#fff' }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}
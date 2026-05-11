import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function CheckoutHeader() {
  return (
    <div className="mb-8">
      <Link
        to="/cart"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-sm text-muted-foreground mt-1">
        No account needed — just your email and delivery address.
      </p>
    </div>
  )
}
import { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import type { StripeCardElement } from '@stripe/stripe-js'
import { Lock, ArrowLeft, Loader2 } from 'lucide-react'

interface Props {
  billingEmail: string
  isProcessing: boolean
  error:        string | null
  onConfirm:    (card: StripeCardElement, email: string) => void
  onBack:       () => void
}

const CARD_OPTIONS = {
  hidePostalCode: true,   // ← removes the ZIP field entirely
  style: {
    base: {
      color:           '#ffffff',
      fontFamily:      'Geist Variable, sans-serif',
      fontSize:        '15px',
      fontSmoothing:   'antialiased',
      '::placeholder': { color: 'rgba(255,255,255,0.35)' },
      iconColor:       'rgba(255,255,255,0.6)',
    },
    invalid: {
      color:     '#ff6b6b',
      iconColor: '#ff6b6b',
    },
  },
}

export function StripeCardStep({ billingEmail, isProcessing, error, onConfirm, onBack }: Props) {
  const stripe   = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const card = elements.getElement(CardElement)
    if (!card) return
    setCardError(null)
    onConfirm(card, billingEmail)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-medium">
          Card details
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 10,
          padding: '14px 16px',
          transition: 'border-color 0.2s',
        }}>
          <CardElement
            options={CARD_OPTIONS}
            onChange={e => setCardError(e.error?.message ?? null)}
          />
        </div>

        {cardError && (
          <p style={{ color: '#ff6b6b', fontSize: 13, marginTop: 8 }}>{cardError}</p>
        )}
      </div>

      {/* Test card hint */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, padding: '10px 14px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.5 }}>
          Test card:{' '}
          <span style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace' }}>
            4242 4242 4242 4242
          </span>
          {' · Any future date · Any CVC'}
        </p>
      </div>

      {/* API-level error */}
      {error && (
        <div style={{
          background: 'rgba(255,80,80,0.1)',
          border: '1px solid rgba(255,80,80,0.25)',
          borderRadius: 8, padding: '10px 14px',
          color: '#ff8080', fontSize: 13,
        }}>
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onBack}
          disabled={isProcessing}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            padding: '12px 18px', borderRadius: 10,
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            opacity: isProcessing ? 0.5 : 1,
          }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        <button type="submit"
          disabled={isProcessing || !stripe}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: isProcessing ? 'rgba(255,255,255,0.15)' : 'oklch(0.62 0.16 40)',
            color: '#fff', border: 'none',
            padding: '12px 24px', borderRadius: 10,
            fontSize: 15, fontWeight: 700,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {isProcessing ? (
            <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
          ) : (
            <><Lock size={15} /> Pay now</>
          )}
        </button>
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.25)', fontSize: 11, textAlign: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        <Lock size={11} /> Secured by Stripe · SSL encrypted
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </form>
  )
}
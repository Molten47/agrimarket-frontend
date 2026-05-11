import { Leaf, Check, X } from 'lucide-react'

type CheckoutStep = 'delivery' | 'payment' | 'processing'

interface Props {
  step?:    CheckoutStep
  onClose?: () => void   // undefined = locked, hide the X
}

const STEPS = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment',  label: 'Payment'  },
]

export function CheckoutModalHeader({ step = 'delivery', onClose }: Props) {
  const activeIndex = step === 'delivery' ? 0 : 1
  const isLocked    = step === 'payment' || step === 'processing'

  return (
    <div style={{
      background: 'oklch(0.18 0.06 148)',
      padding: '20px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Leaf size={18} style={{ color: 'oklch(0.72 0.18 145)' }} />
        <span style={{ fontWeight: 800, fontSize: 16, color: '#fff', letterSpacing: '-0.02em' }}>
          AgriMarket
        </span>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {STEPS.map((s, i) => {
          const isDone   = i < activeIndex
          const isActive = i === activeIndex
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone
                    ? 'oklch(0.55 0.14 148)'
                    : isActive
                      ? 'oklch(0.62 0.16 40)'
                      : 'rgba(255,255,255,0.1)',
                  fontSize: 11, fontWeight: 700, color: '#fff',
                  transition: 'background 0.3s',
                }}>
                  {isDone ? <Check size={12} /> : i + 1}
                </div>
                <span style={{
                  fontSize: 13, fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                  transition: 'color 0.3s',
                }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  width: 28, height: 1,
                  background: isDone ? 'oklch(0.55 0.14 148)' : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Close button — hidden when locked (payment/processing) */}
      <div style={{ width: 28 }}>
        {!isLocked && onClose && (
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.16)'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'
            }}
            aria-label="Close checkout"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Heart } from 'lucide-react'

const AMOUNTS = ['£2', '£5', '£10', '£25']

export default function FooterDonation() {
  const [selected, setSelected] = useState('£5')
  const [donated, setDonated] = useState(false)

  const handleDonate = () => {
    console.log('Donation:', selected)
    setDonated(true)
    setTimeout(() => setDonated(false), 3500)
  }

  return (
    <div style={{
      background: 'oklch(0.28 0.08 148)',
      border: '1px solid oklch(0.45 0.10 148)',
      borderRadius: 20,
      padding: '28px 28px 24px',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Heart size={16} style={{ color: 'oklch(0.78 0.14 75)', flexShrink: 0 }} fill="oklch(0.78 0.14 75)" />
        <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>
          Support rural Britain
        </p>
      </div>

      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 20 }}>
        Every donation funds training for new farmers joining the platform.
      </p>

      {donated ? (
        <div style={{
          background: 'oklch(0.38 0.12 148)', borderRadius: 12,
          padding: '14px 18px', textAlign: 'center',
          color: '#e8f5c8', fontSize: 14, fontWeight: 600, lineHeight: 1.4,
        }}>
          🌱 Thank you! You're growing something good.
        </div>
      ) : (
        <>
          {/* Amount grid — 4 across */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
            {AMOUNTS.map(amt => (
              <button key={amt} onClick={() => setSelected(amt)} style={{
                padding: '9px 0', fontSize: 14, fontWeight: 600,
                borderRadius: '52% 48% 46% 54% / 42% 46% 54% 58%',
                background: selected === amt ? 'oklch(0.78 0.14 75)' : 'oklch(0.22 0.06 148)',
                color: selected === amt ? 'oklch(0.18 0.05 50)' : 'rgba(255,255,255,0.7)',
                border: `1.5px solid ${selected === amt ? 'oklch(0.78 0.14 75)' : 'oklch(0.38 0.08 148)'}`,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderRadius = '46% 54% 52% 48% / 54% 58% 42% 46%'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderRadius = '52% 48% 46% 54% / 42% 46% 54% 58%'}
              >
                {amt}
              </button>
            ))}
          </div>

          <button onClick={handleDonate} style={{
            width: '100%', padding: '13px 0', fontSize: 15, fontWeight: 700,
            background: 'oklch(0.78 0.14 75)', color: 'oklch(0.18 0.05 50)',
            border: 'none', borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
            cursor: 'pointer',
            transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%' }}
          >
            Donate {selected}
          </button>
        </>
      )}
    </div>
  )
}
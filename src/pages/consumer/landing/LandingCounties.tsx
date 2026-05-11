import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useScrollReveal } from './useScrollReveal'

const COUNTIES = [
  'Yorkshire', 'Devon', 'Cumbria', 'Somerset',
  'Norfolk', 'Kent', 'Shropshire', 'Herefordshire',
  'Lincolnshire', 'Suffolk', 'Gloucestershire', 'Dorset',
]

export default function LandingCounties() {
  const { revealStyle } = useScrollReveal()

  return (
    <section style={{ background: 'var(--card)', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
      <div className="max-w-5xl mx-auto">

        <div id="county-head" data-reveal style={{ ...revealStyle('county-head'), textAlign: 'center', marginBottom: 44 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={16} style={{ color: 'var(--chart-3)' }} />
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--chart-3)', textTransform: 'uppercase' }}>
              Where we farm
            </p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--foreground)' }}>
            From the Highlands to the Home Counties
          </h2>
        </div>

        <div id="counties" data-reveal
          style={{ ...revealStyle('counties', 100), display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {COUNTIES.map(county => (
            <Link key={county} to={`/shop?county=${county}`}
              style={{ padding: '8px 18px', borderRadius: 999, border: '1px solid var(--border)', fontSize: 14, color: 'var(--foreground)', textDecoration: 'none', background: 'var(--muted)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary-foreground)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--muted)'; e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {county}
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
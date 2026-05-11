import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, MapPin, Search } from 'lucide-react'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=85',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85',
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&q=85',
]

const wheatBadge: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  padding: '5px 16px 5px 10px',
  background: '#3a5c2c', color: '#e8f5c8',
  fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
  borderRadius: '62% 38% 55% 45% / 48% 62% 38% 52%',
  border: '1.5px solid #5a8c3e', whiteSpace: 'nowrap',
  transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s',
}

const leafPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '14px 28px', fontSize: 15, fontWeight: 600,
  background: 'var(--chart-3)', color: '#fff', border: 'none',
  cursor: 'pointer', textDecoration: 'none', letterSpacing: '-0.01em',
  borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
  transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.22s',
}

const leafGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '14px 28px', fontSize: 15, fontWeight: 600,
  background: 'rgba(255,255,255,0.1)', color: '#fff',
  border: '1.5px solid rgba(255,255,255,0.28)', cursor: 'pointer', textDecoration: 'none',
  borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
  transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.22s, background 0.18s',
}

export default function LandingHero() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [loc, setLoc] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setIdx(i => (i + 1) % HERO_IMAGES.length); setFading(false) }, 500)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const handleSearch = () => navigate(loc.trim() ? `/shop?location=${encodeURIComponent(loc.trim())}` : '/shop')

  const handleDetect = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos => setLoc(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`),
      () => setLoc('Location unavailable')
    )
  }

  return (
    <section id="hero" className="relative overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
      <img src={HERO_IMAGES[idx]} alt="" className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(10,28,18,0.88) 0%, rgba(10,28,18,0.5) 55%, rgba(10,28,18,0.2) 100%)'
      }} />

      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <div style={{ maxWidth: 640 }}>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span style={wheatBadge}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '55% 45% 62% 38% / 52% 48% 62% 38%'; el.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '62% 38% 55% 45% / 48% 62% 38% 52%'; el.style.transform = 'scale(1)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a3d96c', flexShrink: 0 }} />
              Farm to Table
            </span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Across the UK</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Real food from<br />
            <span style={{ color: 'var(--accent)' }}>real farmers</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>
            AgriMarket connects British farmers directly with the people who eat their food.
            No supermarket markups. No food miles. Just honest produce, fairly priced.
          </p>

          {/* Location search bar */}
          <div style={{
            display: 'flex', maxWidth: 520, marginBottom: 20,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: 16, overflow: 'hidden',
          }}>
            <button onClick={handleDetect} title="Use my location" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '14px 16px', background: 'none', border: 'none',
              borderRight: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              flexShrink: 0, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              <MapPin size={16} />
              <span className="hidden sm:inline">My location</span>
            </button>

            <input
              type="text" value={loc} onChange={e => setLoc(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Enter postcode or town…"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', padding: '14px 16px', fontSize: 15, color: '#fff', fontFamily: 'inherit' }}
            />

            <button onClick={handleSearch} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '14px 20px', background: 'var(--accent)', border: 'none',
              cursor: 'pointer', color: 'var(--accent-foreground)', fontWeight: 700, fontSize: 14,
              flexShrink: 0, transition: 'opacity 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Search size={16} />
              <span className="hidden sm:inline">Find farms</span>
            </button>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" style={leafPrimary}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%'; el.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%'; el.style.transform = 'scale(1)' }}
            >
              Browse the farm shop <ArrowRight size={16} />
            </Link>
            <Link to="/register" style={leafGhost}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%'; el.style.transform = 'scale(1.04)'; el.style.background = 'rgba(255,255,255,0.16)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%'; el.style.transform = 'scale(1)'; el.style.background = 'rgba(255,255,255,0.1)' }}
            >
              Sell your produce
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: 'rgba(255,255,255,0.45)', animation: 'bounce 2s infinite' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.1em' }}>SCROLL</span>
        <ChevronDown size={16} />
      </div>
    </section>
  )
}
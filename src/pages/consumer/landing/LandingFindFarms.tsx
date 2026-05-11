import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search, ArrowRight } from 'lucide-react'

const COUNTIES = [
  'Yorkshire', 'Devon', 'Kent', 'Suffolk', 'Norfolk',
  'Lincolnshire', 'Somerset', 'Herefordshire', 'Shropshire', 'Cumbria',
  'Dorset', 'Gloucestershire', 'Wiltshire', 'Oxfordshire', 'Essex',
]

// Accurate simplified UK regions as SVG paths (viewBox 0 0 200 400)
const UK_REGIONS = [
  {
    id: 'scotland',
    label: 'Scotland',
    county: 'Scottish Highlands',
    cx: 105, cy: 80,
    d: `M 118 20 L 128 18 L 140 22 L 148 30 L 150 42 L 145 54
        L 148 62 L 140 70 L 130 76 L 118 78 L 108 72 L 100 62
        L 96 50 L 98 38 L 106 28 Z
        M 88 48 L 96 44 L 96 54 L 88 56 Z`,
  },
  {
    id: 'n-ireland',
    label: 'N. Ireland',
    county: 'County Antrim',
    cx: 78, cy: 108,
    d: `M 70 104 L 82 100 L 88 106 L 86 116 L 76 120 L 68 114 Z`,
  },
  {
    id: 'n-england',
    label: 'N. England',
    county: 'Yorkshire',
    cx: 118, cy: 118,
    d: `M 108 88 L 130 84 L 138 90 L 140 104 L 136 116
        L 124 124 L 110 124 L 102 116 L 102 100 Z`,
  },
  {
    id: 'wales',
    label: 'Wales',
    county: 'Herefordshire',
    cx: 96, cy: 158,
    d: `M 96 132 L 108 128 L 112 138 L 110 152 L 102 162
        L 90 164 L 84 156 L 86 142 Z`,
  },
  {
    id: 'midlands',
    label: 'Midlands',
    county: 'Shropshire',
    cx: 120, cy: 148,
    d: `M 110 128 L 132 124 L 140 132 L 140 148 L 132 158
        L 116 160 L 108 152 L 108 138 Z`,
  },
  {
    id: 'e-anglia',
    label: 'East Anglia',
    county: 'Norfolk',
    cx: 148, cy: 152,
    d: `M 138 132 L 158 128 L 168 138 L 164 154 L 150 162
        L 136 158 L 132 146 Z`,
  },
  {
    id: 'london-se',
    label: 'London & SE',
    county: 'Kent',
    cx: 140, cy: 178,
    d: `M 118 162 L 148 158 L 158 166 L 154 180 L 136 186
        L 118 182 L 112 172 Z`,
  },
  {
    id: 'sw-england',
    label: 'SW England',
    county: 'Devon',
    cx: 100, cy: 198,
    d: `M 92 178 L 116 174 L 118 186 L 110 200 L 96 208
        L 82 204 L 80 192 Z`,
  },
  {
    id: 's-england',
    label: 'S. England',
    county: 'Dorset',
    cx: 124, cy: 196,
    d: `M 116 182 L 136 180 L 144 188 L 138 200 L 120 204
        L 110 198 L 112 186 Z`,
  },
]

// Farm dot positions scattered around England
const FARM_DOTS = [
  [116, 96], [124, 108], [112, 116],
  [120, 140], [132, 136], [150, 142],
  [100, 148], [122, 158], [136, 170],
  [104, 190], [126, 188], [140, 192],
]

export default function LandingFindFarms() {
  const [query, setQuery]               = useState('')
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSearch = (overrideQuery?: string) => {
    const q = overrideQuery ?? query.trim() ?? selectedRegion
    navigate(q ? `/shop?location=${encodeURIComponent(q)}` : '/shop')
  }

  const handleRegionClick = (region: typeof UK_REGIONS[0]) => {
    setSelectedRegion(region.county)
    setQuery(region.county)
  }

  const suggestions = query.length > 1
    ? COUNTIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : []

  const hovered = UK_REGIONS.find(r => r.id === hoveredRegion)

  return (
    <section id="farms" style={{
      background: 'var(--muted)',
      padding: 'clamp(56px,7vw,96px) clamp(20px,5vw,80px)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(40px,5vw,72px)',
        alignItems: 'center',
      }}>

        {/* ── LEFT: content + search ── */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: 12 }}>
            Find farms
          </p>
          <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Fresh produce,<br />wherever you are.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 32, maxWidth: 400 }}>
            Browse farms by county or postcode. Every farm on AgriMarket is verified —
            real people, real land, real food.
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 460, marginBottom: 8 }}>
            <div style={{
              display: 'flex', background: 'var(--card)',
              border: '1.5px solid var(--border)', borderRadius: 14,
              overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 14, color: 'var(--muted-foreground)' }}>
                <MapPin size={17} />
              </div>
              <input
                type="text" value={query}
                onChange={e => { setQuery(e.target.value); setSelectedRegion(null) }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="County, town or postcode…"
                style={{ flex: 1, border: 'none', outline: 'none', padding: '13px 12px', fontSize: 15, background: 'transparent', color: 'var(--foreground)', fontFamily: 'inherit' }}
              />
              <button onClick={() => handleSearch()} style={{
                padding: '13px 18px', background: 'var(--primary)', border: 'none',
                cursor: 'pointer', color: 'var(--primary-foreground)',
                display: 'flex', alignItems: 'center', gap: 6,
                fontWeight: 700, fontSize: 14, transition: 'opacity 0.18s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Search size={15} /> Search
              </button>
            </div>

            {/* Autocomplete */}
            {suggestions.length > 0 && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}>
                {suggestions.slice(0, 5).map(county => (
                  <button key={county}
                    onClick={() => { setQuery(county); setSelectedRegion(county); handleSearch(county) }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '10px 14px',
                      background: 'none', border: 'none', borderBottom: '1px solid var(--border)',
                      cursor: 'pointer', fontSize: 14, color: 'var(--foreground)',
                      display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <MapPin size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {county}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Popular counties */}
          <div style={{ marginBottom: 28, marginTop: 16 }}>
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 10, fontWeight: 500 }}>Popular counties</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {COUNTIES.slice(0, 8).map(county => {
                const active = selectedRegion === county
                return (
                  <button key={county}
                    onClick={() => { setQuery(county); handleSearch(county) }}
                    style={{
                      padding: '6px 14px', fontSize: 13, fontWeight: 500,
                      background: active ? 'var(--primary)' : 'var(--card)',
                      color: active ? 'var(--primary-foreground)' : 'var(--foreground)',
                      border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '62% 38% 55% 45% / 48% 62% 38% 52%',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '55% 45% 62% 38% / 52% 48% 62% 38%'; el.style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '62% 38% 55% 45% / 48% 62% 38% 52%'; el.style.transform = 'scale(1)' }}
                  >
                    {county}
                  </button>
                )
              })}
            </div>
          </div>

          <button onClick={() => navigate('/shop')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 600, color: 'var(--primary)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            transition: 'gap 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
          >
            Browse all farms <ArrowRight size={15} />
          </button>
        </div>

        {/* ── RIGHT: UK map ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            background: 'var(--card)', borderRadius: 24, padding: '20px 20px 16px',
            border: '1.5px solid var(--border)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            width: '100%', maxWidth: 360,
          }}>
            {/* Status label */}
            <p style={{
              fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 10,
              textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
              minHeight: 16,
            }}>
              {hovered
                ? `${hovered.label} — click to explore`
                : selectedRegion
                  ? `✓ ${selectedRegion} selected`
                  : 'Click a region to explore'}
            </p>

            {/* SVG UK map */}
            <svg viewBox="60 10 120 210" width="100%" style={{ display: 'block' }}>
              {/* Sea background */}
              <rect x="60" y="10" width="120" height="210" rx="8"
                fill="oklch(0.90 0.02 220)" />

              {/* Subtle lat/lon grid */}
              {[50, 90, 130, 170, 210].map(y => (
                <line key={`h${y}`} x1="60" y1={y} x2="180" y2={y}
                  stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />
              ))}
              {[80, 110, 140, 160].map(x => (
                <line key={`v${x}`} x1={x} y1="10" x2={x} y2="220"
                  stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />
              ))}

              {UK_REGIONS.map(region => {
                const isHov = hoveredRegion === region.id
                const isSel = selectedRegion === region.county
                return (
                  <g key={region.id}>
                    <path
                      d={region.d}
                      fill={isSel
                        ? 'oklch(0.38 0.12 148)'
                        : isHov
                          ? 'oklch(0.50 0.14 148)'
                          : 'oklch(0.65 0.10 148)'}
                      stroke="var(--card)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                      style={{ cursor: 'pointer', transition: 'fill 0.18s' }}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => handleRegionClick(region)}
                    />
                    {(isHov || isSel) && (
                      <text
                        x={region.cx} y={region.cy}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="5.5" fontWeight="700" fill="#fff"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {region.label}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Pulsing farm dots */}
              {FARM_DOTS.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2"
                  fill="oklch(0.78 0.14 75)"
                  stroke="var(--card)" strokeWidth="0.8"
                  opacity="0.9"
                />
              ))}
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
              {[
                { color: 'oklch(0.65 0.10 148)', label: 'Region' },
                { color: 'oklch(0.78 0.14 75)', label: 'Active farm', round: true },
              ].map(({ color, label, round }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--muted-foreground)' }}>
                  <span style={{ width: round ? 8 : 10, height: round ? 8 : 8, borderRadius: round ? '50%' : 2, background: color, display: 'inline-block', flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 360 }}>
            {[['340+', 'Verified farms'], ['47', 'Counties'], ['12k+', 'Customers']].map(([val, lbl]) => (
              <div key={lbl} style={{
                flex: 1, textAlign: 'center', padding: '14px 8px',
                background: 'var(--card)', borderRadius: 14, border: '1px solid var(--border)',
              }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>{val}</p>
                <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
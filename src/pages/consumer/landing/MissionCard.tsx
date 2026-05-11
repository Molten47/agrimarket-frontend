import type { ReactNode } from 'react'

interface Props {
  index:    number
  label:    string
  heading:  string
  body:     string
  icon:     ReactNode
  bgVar:    string   // CSS background value
  fgDark:   boolean  // true = dark text, false = light text
  topOffset: number  // sticky top px
}

export default function MissionCard({
  index, label, heading, body, icon, bgVar, fgDark, topOffset
}: Props) {
  const fg      = fgDark ? 'var(--foreground)'         : '#fff'
  const fgMuted = fgDark ? 'var(--muted-foreground)'   : 'rgba(255,255,255,0.65)'
  const fgLabel = fgDark ? 'var(--chart-3)'            : 'var(--accent)'

  return (
    <div style={{
      position:     'sticky',
      top:          topOffset,
      height:       '100vh',
      display:      'flex',
      alignItems:   'center',
      justifyContent: 'center',
      background:   bgVar,
      zIndex:       index + 1,
      // Each card casts a subtle shadow upward so the overlap reads clearly
      boxShadow:    '0 -12px 48px rgba(0,0,0,0.18)',
    }}>
      <div className="max-w-5xl mx-auto w-full px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* Text side */}
        <div style={{ order: index % 2 === 0 ? 0 : 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: fgLabel, textTransform: 'uppercase', marginBottom: 14 }}>
            {String(index + 1).padStart(2, '0')} — {label}
          </p>
          <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: fg, lineHeight: 1.2, marginBottom: 20 }}>
            {heading}
          </h3>
          <p style={{ color: fgMuted, fontSize: 15, lineHeight: 1.8, maxWidth: 440 }}>
            {body}
          </p>
        </div>

        {/* Icon/illustration side */}
        <div style={{
          order:          index % 2 === 0 ? 1 : 0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width:          200,
            height:         200,
            borderRadius:   '40% 60% 55% 45% / 45% 50% 50% 55%',
            background:     fgDark
              ? 'rgba(0,0,0,0.06)'
              : 'rgba(255,255,255,0.10)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            {icon}
          </div>
        </div>

      </div>
    </div>
  )
}
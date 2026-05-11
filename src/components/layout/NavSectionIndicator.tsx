interface Props {
  activeId: string
  transparent?: boolean
}

const SECTIONS = [
  {
    id: 'hero',
    label: 'Home',
    activeColor: 'oklch(0.62 0.16 40)',
    restShape:  '52% 48% 46% 54% / 42% 46% 54% 58%',
    hoverShape: '46% 54% 52% 48% / 54% 58% 42% 46%',
  },
  {
    id: 'mission',
    label: 'Mission',
    activeColor: 'oklch(0.38 0.12 148)',
    restShape:  '48% 52% 60% 40% / 60% 40% 52% 48%',
    hoverShape: '52% 48% 40% 60% / 40% 60% 48% 52%',
  },
  {
    id: 'how',
    label: 'How it works',
    activeColor: 'oklch(0.65 0.16 55)',
    restShape:  '40% 60% 55% 45% / 55% 45% 60% 40%',
    hoverShape: '60% 40% 45% 55% / 45% 55% 40% 60%',
  },
  {
    id: 'testimonials',
    label: 'Reviews',
    activeColor: 'oklch(0.52 0.18 330)',       // berry / fig purple-red
    restShape:  '58% 42% 50% 50% / 50% 58% 42% 50%',
    hoverShape: '42% 58% 50% 50% / 58% 42% 58% 42%',
  },
  {
    id: 'community',
    label: 'Community',
    activeColor: 'oklch(0.50 0.20 20)',
    restShape:  '52% 48% 48% 52% / 48% 52% 52% 48%',
    hoverShape: '48% 52% 52% 48% / 52% 48% 48% 52%',
  },
  {
    id: 'farms',
    label: 'Find farms',
    activeColor: 'oklch(0.48 0.12 165)',
    restShape:  '45% 55% 62% 38% / 38% 62% 45% 55%',
    hoverShape: '55% 45% 38% 62% / 62% 38% 55% 45%',
  },
]

export default function NavSectionIndicator({ activeId, transparent = false }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {SECTIONS.map(({ id, label, activeColor, restShape, hoverShape }) => {
        const isActive = activeId === id

        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={e => {
              e.preventDefault()
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              padding: '5px 14px',
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              borderRadius: restShape,
              background: isActive ? activeColor : 'transparent',
              color: isActive
                ? '#fff'
                : transparent
                  ? 'rgba(255,255,255,0.80)'
                  : 'var(--foreground)',
              border: isActive
                ? 'none'
                : transparent
                  ? '1px solid rgba(255,255,255,0.18)'
                  : '1px solid transparent',
              transition: [
                'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                'background 0.25s',
                'color 0.25s',
                'transform 0.2s',
              ].join(', '),
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderRadius = hoverShape
              el.style.transform = 'scale(1.05)'
              if (!isActive) {
                el.style.background = transparent ? 'rgba(255,255,255,0.12)' : 'var(--muted)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderRadius = restShape
              el.style.transform = 'scale(1)'
              if (!isActive) el.style.background = 'transparent'
            }}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
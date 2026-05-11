const TILT_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=320&q=80', alt: 'Farmer in field', rotate: -6, z: 1 },
  { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=320&q=80', alt: 'Fresh produce', rotate: 2, z: 2 },
  { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=320&q=80', alt: 'Market stall', rotate: -3, z: 3 },
  { src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=320&q=80', alt: 'Community', rotate: 5, z: 4 },
]

interface Props {
  onJoinClick: () => void
}

export default function CommunityRow({ onJoinClick }: Props) {
  return (
    <div style={{
      background: 'var(--background)',
      padding: 'clamp(48px, 7vw, 88px) clamp(20px, 6vw, 80px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(36px, 5vw, 64px)',
      alignItems: 'center',
    }}>

      {/* Tilt-stacked images */}
      <div style={{ position: 'relative', height: 280, display: 'flex', justifyContent: 'center' }}>
        {TILT_IMAGES.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            style={{
              position: 'absolute',
              width: 180,
              height: 220,
              objectFit: 'cover',
              borderRadius: 16,
              transform: `rotate(${img.rotate}deg) translateX(${(i - 1.5) * 28}px)`,
              zIndex: img.z,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              border: '3px solid var(--card)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              top: `${i * 10}px`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform =
                `rotate(${img.rotate * 0.3}deg) translateX(${(i - 1.5) * 28}px) scale(1.06)`
              ;(e.currentTarget as HTMLElement).style.zIndex = '10'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform =
                `rotate(${img.rotate}deg) translateX(${(i - 1.5) * 28}px) scale(1)`
              ;(e.currentTarget as HTMLElement).style.zIndex = String(img.z)
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 480 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: 12 }}>
          Community
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: 16 }}>
          Farmers and foodies,<br />growing together.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 0 }}>
          Over 4,000 people are already swapping recipes, sharing harvest updates, and celebrating the seasons together.{' '}
          <a
            onClick={(e) => { e.preventDefault(); onJoinClick() }}
            href="#"
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
              textDecoration: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: 'var(--accent)',
              textUnderlineOffset: 4,
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--primary)')}
          >
            Join the conversation
          </a>{' '}
          — it costs nothing and grows everything.
        </p>
      </div>
    </div>
  )
}


const TESTIMONIALS = [
  {
    quote: "I've never eaten vegetables this fresh. Knowing exactly which farm they come from changes everything.",
    name: 'Margaret Hollis',
    role: 'Weekly customer, Bristol',
    stars: 5,
  },
  {
    quote: "My first month on AgriMarket I sold more lamb than the previous quarter at market. No middleman, fair prices.",
    name: 'Tom Ashworth',
    role: 'Sheep farmer, Cumbria',
    stars: 5,
  },
  {
    quote: "We source 80% of our produce through AgriMarket now. The quality is consistent and the farmers are responsive.",
    name: 'Priya Naidu',
    role: 'Restaurant owner, Edinburgh',
    stars: 5,
  },
]

export default function LandingTestimonials() {
  return (
    <section id="testimonials" style={{
      background: 'var(--background)',
      padding: 'clamp(56px,7vw,96px) clamp(20px,5vw,80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--chart-3)', fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>
          What people say
        </p>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'var(--foreground)', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>
          Trusted by farmers and families
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 24 }}>
          {TESTIMONIALS.map(({ quote, name, role, stars }) => (
            <div key={name} style={{
              background: 'var(--card)', borderRadius: 18,
              padding: '28px 28px 24px', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} style={{ color: 'var(--chart-3)', fontSize: 18 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 15, color: 'var(--foreground)', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
                "{quote}"
              </p>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--foreground)', margin: 0 }}>{name}</p>
                <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: '2px 0 0' }}>{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
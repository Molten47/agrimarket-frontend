import { useScrollReveal } from './useScrollReveal'

const STEPS = [
  {
    step: '01',
    title: 'Browse local farms',
    desc: 'Explore seasonal produce from verified British farmers near you. Filter by county, product type, or farm.',
  },
  {
    step: '02',
    title: 'Order directly',
    desc: 'No auction, no middleman. Your payment goes straight to the farm. The farmer confirms and dispatches.',
  },
  {
    step: '03',
    title: 'Farm to your door',
    desc: 'Receive produce harvested to order. Track your delivery and get notified at every step.',
  },
]

export default function LandingHowItWorks() {
  const { revealStyle } = useScrollReveal()

  return (
    <section id="how" style={{ background: 'var(--card)', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
      <div className="max-w-5xl mx-auto">

        <div id="hiw-head" data-reveal style={{ ...revealStyle('hiw-head'), textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--chart-3)', textTransform: 'uppercase', marginBottom: 12 }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--foreground)' }}>
            Three steps, farm to front door
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <div key={step} id={`hiw-${i}`} data-reveal style={revealStyle(`hiw-${i}`, i * 120)}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, marginBottom: 20, letterSpacing: '0.05em' }}>
                {step}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--foreground)' }}>{title}</h3>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, fontSize: 14 }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
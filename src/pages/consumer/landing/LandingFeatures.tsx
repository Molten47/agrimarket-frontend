import { ShieldCheck, Truck, Users } from 'lucide-react'
import { useScrollReveal } from './useScrollReveal'

const FEATURES = [
  { icon: ShieldCheck, title: 'No hidden fees',    desc: 'Transparent pricing. Farmers keep the majority of every sale. No auction house cuts.' },
  { icon: Truck,       title: 'Direct delivery',   desc: 'Farmers dispatch orders themselves. No third-party logistics eating into freshness.' },
  { icon: Users,       title: 'Community first',   desc: 'Every farm has a story. Meet the people behind your food and support rural communities.' },
]

export default function LandingFeatures() {
  const { revealStyle } = useScrollReveal()

  return (
    <section style={{ background: 'var(--primary)', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
      <div className="max-w-5xl mx-auto">

        <div id="feat-head" data-reveal style={{ ...revealStyle('feat-head'), textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--primary-foreground)' }}>
            Built for farmers, loved by eaters
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} id={`feat-${i}`} data-reveal
              style={{ ...revealStyle(`feat-${i}`, i * 100), background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--chart-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--primary-foreground)', marginBottom: 8 }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
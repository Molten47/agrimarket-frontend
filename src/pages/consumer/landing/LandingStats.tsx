import { useEffect, useRef, useState } from 'react'

interface Stat {
  prefix:  string
  value:   number
  suffix:  string
  label:   string
  decimals?: number
}

const STATS: Stat[] = [
  { prefix: '',  value: 340,  suffix: '+',  label: 'Active farms' },
  { prefix: '',  value: 12,   suffix: 'k+', label: 'Happy customers' },
  { prefix: '£', value: 2.1,  suffix: 'M',  label: 'Paid to farmers', decimals: 1 },
  { prefix: '',  value: 47,   suffix: '',   label: 'UK counties covered' },
]

// Counts from 0 → target in ~0.3s, stepping every 5 units (or proportional for decimals)
function useCountUp(target: number, decimals = 0, active: boolean) {
  const [display, setDisplay] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const duration  = 900          // ms
    const start     = performance.now()
    const step      = decimals ? 0.05 : 5

    function tick(now: number) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      const raw      = eased * target
      // Snap to nearest step for the chunky +1/+5 feel
      const snapped  = decimals
        ? Math.round(raw / step) * step
        : Math.round(raw / step) * step
      setDisplay(parseFloat(snapped.toFixed(decimals)))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
      else setDisplay(target)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target, decimals])

  return display
}

function StatItem({ prefix, value, suffix, label, decimals = 0 }: Stat) {
  const [active, setActive] = useState(false)
  const ref  = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, decimals, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const formatted = decimals
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString('en-GB')

  return (
    <div ref={ref} className="text-center">
      <p style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
        {prefix}{formatted}{suffix}
      </p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
        {label}
      </p>
    </div>
  )
}

export default function LandingStats() {
  return (
    <section style={{ background: 'var(--primary)', padding: '28px 24px' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map(stat => <StatItem key={stat.label} {...stat} />)}
      </div>
    </section>
  )
}
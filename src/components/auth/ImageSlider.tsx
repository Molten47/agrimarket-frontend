import { useEffect, useState } from 'react'

const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80',
    caption: 'Fresh from the field',
    location: 'Yorkshire Dales, UK',
  },
  {
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80',
    caption: 'Grown with care',
    location: 'Somerset, UK',
  },
  {
    url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80',
    caption: 'Direct to your door',
    location: 'Scottish Highlands, UK',
  },
  {
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80',
    caption: 'Supporting local farmers',
    location: 'Devon, UK',
  },
  {
    url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80',
    caption: 'Organic and sustainable',
    location: 'Wales, UK',
  },
]

export function AuthImageSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % IMAGES.length)
        setFading(false)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const img = IMAGES[current]

  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: '#0f1f18' }}>

      {/* Image */}
      <img
        key={current}
        src={img.url}
        alt={img.caption}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />

      {/* Brand top-left */}
      <div className="absolute top-8 left-8 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'oklch(0.62 0.16 40)' }}>
          <span className="text-white text-sm font-bold">A</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">AgriMarket</span>
      </div>

      {/* Caption bottom-left */}
      <div className="absolute bottom-10 left-8 right-8">
        <p className="text-white font-semibold text-xl leading-snug mb-1"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.4s' }}>
          {img.caption}
        </p>
        <p className="text-white/60 text-sm">{img.location}</p>
      </div>
    </div>
  )
}
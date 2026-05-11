import { Farmer } from '@/types'
import { WeatherWidget } from '@/components/shared/WeatherWideget'

interface Props {
  farmer: Farmer | null
}

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

function todayLabel() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

export function WelcomeBanner({ farmer }: Props) {
  return (
    <div
      className="rounded-2xl px-7 py-5 mb-8 flex items-center justify-between"
      style={{ background: 'linear-gradient(135deg, #1a3a2e 0%, #254d3a 100%)' }}
    >
      <div>
        <p className="text-white/60 text-sm">{greeting()}</p>
        <h1 className="text-white font-bold text-2xl mt-0.5">
          {farmer?.farm_name ?? 'Your Farm'} 
        </h1>
        <p className="text-white/50 text-xs mt-1">
          {farmer?.county && `${farmer.county} · `}{todayLabel()}
        </p>
      </div>

      <WeatherWidget />
    </div>
  )
}
import { useWeather } from '@/hooks/useWeather'

export function WeatherWidget() {
  const { weather, isLoading } = useWeather()

  if (isLoading) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl animate-pulse"
        style={{ background: 'rgba(255,255,255,0.08)', width: 120, height: 40 }}
      />
    )
  }

  if (!weather) return null

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
    >
      <span className="text-2xl leading-none">{weather.icon}</span>
      <div>
        <p className="text-white font-bold text-sm leading-tight">
          {weather.temp}°C
          <span className="font-normal text-white/60 ml-1 text-xs">{weather.description}</span>
        </p>
        <p className="text-white/50 text-xs leading-tight">{weather.location}</p>
      </div>
    </div>
  )
}
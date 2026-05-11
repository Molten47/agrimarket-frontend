import { useState, useEffect } from 'react'

interface Weather {
  temp:        number
  description: string
  icon:        string
  location:    string
}

const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0:  { label: 'Clear sky',       icon: '☀️' },
  1:  { label: 'Mainly clear',    icon: '🌤️' },
  2:  { label: 'Partly cloudy',   icon: '⛅' },
  3:  { label: 'Overcast',        icon: '☁️' },
  45: { label: 'Foggy',           icon: '🌫️' },
  48: { label: 'Icy fog',         icon: '🌫️' },
  51: { label: 'Light drizzle',   icon: '🌦️' },
  61: { label: 'Light rain',      icon: '🌧️' },
  63: { label: 'Moderate rain',   icon: '🌧️' },
  65: { label: 'Heavy rain',      icon: '🌧️' },
  71: { label: 'Light snow',      icon: '🌨️' },
  80: { label: 'Rain showers',    icon: '🌦️' },
  95: { label: 'Thunderstorm',    icon: '⛈️' },
}

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords

          // Reverse geocode with Open-Meteo's built-in location
          const [meteoRes, geoRes] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`),
          ])

          const meteo = await meteoRes.json()
          const geo   = await geoRes.json()

          const code    = meteo.current.weather_code as number
          const wmo     = WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️' }
          const county  = geo.address?.county ?? geo.address?.state ?? 'Unknown location'

          setWeather({
            temp:        Math.round(meteo.current.temperature_2m),
            description: wmo.label,
            icon:        wmo.icon,
            location:    county,
          })
        } catch {
          // silently fail — weather is non-critical
        } finally {
          setIsLoading(false)
        }
      },
      () => setIsLoading(false), // user denied geolocation
      { timeout: 5000 }
    )
  }, [])

  return { weather, isLoading }
}
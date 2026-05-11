import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Must match DOM order of sections in LandingPage.tsx exactly
const SECTION_IDS = ['hero', 'mission', 'how', 'testimonials', 'community', 'farms']

export function useNavSections() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    if (!isLanding) return

    function onScroll() {
      const threshold = window.innerHeight * 0.35

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) {
          setActiveId(SECTION_IDS[i])
          return
        }
      }

      setActiveId('hero')
    }

    const timer = setTimeout(() => {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 150)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isLanding])

  return { activeId, isLanding }
}
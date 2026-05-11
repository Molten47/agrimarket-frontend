import { useEffect, useRef, useState } from 'react'

export function useScrollReveal() {
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(v => new Set([...v, e.target.id]))
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-reveal]').forEach(el => {
      observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  function revealStyle(id: string, delay = 0): React.CSSProperties {
    return {
      opacity:    visible.has(id) ? 1 : 0,
      transform:  visible.has(id) ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }
  }

  return { revealStyle }
}
import { useState, useEffect, useRef, useCallback } from 'react'

export function useCommunityModal() {
  const [open, setOpen] = useState(false)
  const touchStartY = useRef<number | null>(null)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  // Swipe-down to close (mobile)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    if (delta > 60) closeModal()
    touchStartY.current = null
  }, [closeModal])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return { open, openModal, closeModal, onTouchStart, onTouchEnd }
}
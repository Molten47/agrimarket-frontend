import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { NotificationPanel } from './NotificationPanel'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const ref             = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, isLoading, markRead } = useNotifications()

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    // position:relative here so NotificationPanel's top-full is anchored to this div
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
        style={{
          background: open ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
        }}
        title="Notifications"
      >
        <Bell className="h-4 w-4 text-white/70" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-4.5 h-4.5 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: 'oklch(0.62 0.16 40)', fontSize: '0.6rem', padding: '0 3px' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationPanel
          notifications={notifications}
          isLoading={isLoading}
          onMarkRead={markRead}
        />
      )}
    </div>
  )
}
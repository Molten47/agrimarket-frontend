import { Notification } from '@/hooks/useNotifications'
import { NotificationItem } from './NotificationItem'
import { Bell, BellOff} from 'lucide-react'

interface Props {
  notifications: Notification[]
  isLoading:     boolean
  onMarkRead:    (id: string) => void
}

export function NotificationPanel({ notifications, isLoading, onMarkRead }: Props) {
  return (
    <div
      className="absolute top-full left-0 mt-2 w-72 rounded-xl overflow-hidden shadow-2xl z-50"
      style={{ background: '#1a3a2e', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div
        className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-widest"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        Notifications
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="px-4 py-6 text-center text-white/40 text-xs">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="px-4 py-8 text-center items-center flex flex-col space-y-2">
                <BellOff className='text-white/40' size={18}/>
            <p className="text-white/40 text-xs">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkRead={onMarkRead} />
          ))
        )}
      </div>
    </div>
  )
}
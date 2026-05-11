import { Notification } from '@/hooks/useNotifications'
import { notificationLabel, notificationIcon, timeAgo } from './NotificationHelpers'

interface Props {
  notification: Notification
  onMarkRead:   (id: string) => void
}

export function NotificationItem({ notification, onMarkRead }: Props) {
  const isUnread = !notification.is_sent

  return (
    <div
      onClick={() => isUnread && onMarkRead(notification.id)}
      className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/5"
      style={{
        background: isUnread ? 'rgba(255,255,255,0.06)' : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span className="text-lg leading-none mt-0.5 flex-shrink-0">
        {notificationIcon(notification.event_type)}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-white/90 text-xs font-medium leading-tight">
          {notificationLabel(notification.event_type)}
        </p>
        <p className="text-white/40 text-xs mt-0.5">
          {timeAgo(notification.created_at)}
        </p>
      </div>

      {isUnread && (
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
      )}
    </div>
  )
}
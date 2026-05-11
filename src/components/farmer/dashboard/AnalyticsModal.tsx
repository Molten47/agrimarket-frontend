import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { X, ExternalLink, Loader2 } from 'lucide-react'

const AnalyticsModalContent = lazy(() => import('./AnalyticsModalContent'))

interface Props { onClose: () => void }

export function AnalyticsModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>

      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ background: 'linear-gradient(135deg, #1a3a2e 0%, #254d3a 100%)' }}>
          <div>
            <p className="text-white font-semibold">Analytics Snapshot</p>
            <p className="text-white/50 text-xs mt-0.5">Last 30 days</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/analytics" onClick={onClose}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              <ExternalLink className="w-3 h-3" /> Full report
            </Link>
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lazy content */}
        <div className="p-5">
          <Suspense fallback={
            <div className="flex items-center justify-center py-16 gap-2 text-sm text-stone-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading analytics...
            </div>
          }>
            <AnalyticsModalContent />
          </Suspense>
        </div>

      </div>
    </div>
  )
}
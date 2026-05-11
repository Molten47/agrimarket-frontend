import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, BarChart2, ShoppingBag, LineChart, LogOut, Menu, X, Leaf } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'



const navItems = [
  { label: 'Dashboard',  href: '/dashboard',            icon: LayoutDashboard },
  { label: 'Products',   href: '/dashboard/products',   icon: Package },
  { label: 'Stock',      href: '/dashboard/stock',      icon: BarChart2 },
  { label: 'Orders',     href: '/dashboard/orders',     icon: ShoppingBag },
  { label: 'Analytics',  href: '/dashboard/analytics',  icon: LineChart },
 

{ label: 'Bookkeeping', href: '/dashboard/bookkeeping', icon: BookOpen },
]
const SIDEBAR_BG   = '#1a3a2e'
const SIDEBAR_DARK = '#122a21'
const AMBER        = 'oklch(0.62 0.16 40)'

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const { farmer, logout } = useAuthStore()
  const location           = useLocation()
  const navigate           = useNavigate()

  return (
    <div className="flex flex-col h-full" style={{ background: SIDEBAR_BG }}>
      {/* Logo row */}
      <div className="flex items-center justify-between px-5 py-4" style={{ background: SIDEBAR_DARK }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: AMBER }}>
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm">AgriMarket</span>
        </Link>
        <NotificationBell />
      </div>

      {/* Farmer info */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-white font-semibold text-sm truncate">{farmer?.farm_name}</p>
        <p className="text-white/40 text-xs truncate mt-0.5">{farmer?.county}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = location.pathname === href
          return (
          <Link
          key={href}
          to={href}
          onClick={onNav}
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm relative overflow-hidden transition-all duration-150"
          style={{
            background: active
              ? 'linear-gradient(90deg, rgba(224,123,40,0.18) 0%, rgba(224,123,40,0.06) 100%)'
              : 'transparent',
            color:      active ? '#fff' : 'rgba(255,255,255,0.55)',
            border:     active ? '1px solid rgba(224,123,40,0.25)' : '1px solid transparent',
          }}
        >
          {active && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
              style={{ background: 'oklch(0.62 0.16 40)' }} />
          )}
          <Icon
            className="h-4 w-4 shrink-0 transition-colors"
            style={{ color: active ? 'oklch(0.62 0.16 40)' : 'rgba(255,255,255,0.45)' }}
          />
          <span className="font-medium">{label}</span>
          </Link>
          )
        })}
      </nav>

      {/* Food strip */}
      <div className="px-4 py-2 text-lg tracking-widest" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        🌽 🧀 🥛 🍅 🫒
        <p className="text-white/25 text-xs mt-0.5">Fresh today</p>
      </div>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate('/login') }}
        className="flex items-center gap-3 px-5 py-4 text-sm text-white/40 hover:text-white/70 transition-colors"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  )
}

export default function FarmerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop */}
      <div className="hidden md:flex w-56 shrink-0">
        <div className="fixed top-0 left-0 w-56 h-screen">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-56 h-full shadow-2xl">
            <SidebarContent onNav={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-40 border-b bg-background px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-primary text-sm">AgriMarket</span>
          <button onClick={() => setSidebarOpen((o) => !o)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
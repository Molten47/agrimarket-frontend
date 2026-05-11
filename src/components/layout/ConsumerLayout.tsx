import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Leaf, Menu, X, Package } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart.store'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavSections } from './useNavsections'
import NavSectionIndicator from './NavSectionIndicator'
import { getLastOrder, clearLastOrder, LastOrder } from '@/lib/lastOrder'

export default function ConsumerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [lastOrder,  setLastOrder]  = useState<LastOrder | null>(null)

  const itemCount                          = useCartStore((s) => s.itemCount)
  const { isAuthenticated, farmer, logout } = useAuthStore()
  const navigate                           = useNavigate()
  const location                           = useLocation()
  const { activeId, isLanding }            = useNavSections()

  const handleLogout = () => { logout(); navigate('/login') }

  // Read last order from localStorage on mount + on route change
  useEffect(() => {
    setLastOrder(getLastOrder())
  }, [location.pathname])

  // Transparent-to-frosted scroll transition — only on landing
  useEffect(() => {
    if (!isLanding) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLanding])

  useEffect(() => {
    if (!isLanding) setScrolled(false)
  }, [isLanding])

  const transparent = isLanding && !scrolled

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background:          transparent ? 'transparent' : 'rgba(249,245,238,0.85)',
          backdropFilter:      transparent ? 'none' : 'blur(18px) saturate(1.5)',
          WebkitBackdropFilter:transparent ? 'none' : 'blur(18px) saturate(1.5)',
          borderBottom:        `1px solid ${transparent ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg no-underline"
            style={{ color: transparent ? '#fff' : 'var(--primary)', transition: 'color 0.3s' }}>
            <Leaf className="h-5 w-5"
              style={{ color: transparent ? '#a3d96c' : 'var(--primary)', transition: 'color 0.3s' }} />
            AgriMarket
          </Link>

          {/* Centre — section pills or shop link */}
          <div className="hidden md:flex items-center gap-4">
            {isLanding ? (
              <NavSectionIndicator activeId={activeId} transparent={transparent} />
            ) : (
              <nav className="flex items-center gap-6 text-sm">
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>

                {/* Track order pill — shown when a recent order exists */}
                {lastOrder && !isLanding && (
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/order/${lastOrder.id}/tracking?key=${lastOrder.key}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                      style={{
                        background:  'oklch(0.18 0.06 148)',
                        color:       '#fff',
                        padding:     '4px 12px',
                        borderRadius: 999,
                        fontSize:    12,
                        fontWeight:  600,
                        textDecoration: 'none',
                      }}
                    >
                      <Package size={12} /> Track order
                    </Link>
                    <button
                      onClick={() => { clearLastOrder(); setLastOrder(null) }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1,
                        padding: '2px 4px',
                      }}
                      title="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                )}
              </nav>
            )}
          </div>

          {/* Right — auth + cart */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm"
                    style={{ color: transparent ? 'rgba(255,255,255,0.85)' : undefined }}>
                    {farmer?.farm_name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm"
                    style={{ color: transparent ? 'rgba(255,255,255,0.85)' : undefined }}>
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm"
                    style={transparent ? {
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      color: '#fff',
                      borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
                    } : {
                      borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%'}
                  >
                    Sell on AgriMarket
                  </Button>
                </Link>
              </>
            )}

            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon"
                style={transparent ? {
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                } : undefined}>
                <ShoppingCart className="h-4 w-4" />
              </Button>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{ color: transparent ? '#fff' : 'var(--foreground)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3 bg-background">
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-sm">Shop</Link>
            {lastOrder && (
              <Link
                to={`/order/${lastOrder.id}/tracking?key=${lastOrder.key}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm flex items-center gap-2"
              >
                <Package size={13} /> Track your order
              </Link>
            )}
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-sm flex items-center gap-2">
              Cart {itemCount > 0 && <Badge>{itemCount}</Badge>}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm text-left text-destructive">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm">Log in</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm">Sell on AgriMarket</Link>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1" style={{ paddingTop: isLanding ? 0 : 64 }}>
        <Outlet />
      </main>

    </div>
  )
}
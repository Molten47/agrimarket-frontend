import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

// Auth pages
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage'

// Consumer pages
import ShopPage from '@/pages/consumer/ShopPage'
import ProductPage from '@/pages/consumer/ProductPage'
import CartPage from '@/pages/consumer/CartPage'
import CheckoutPage from '@/pages/consumer/CheckoutPage'
import OrderConfirmationPage from '@/pages/consumer/OrderConfirmationPage'

// Farmer pages
import DashboardPage from '@/pages/farmer/DashboardPage'
import ProductsPage from '@/pages/farmer/ProductsPage'
import StockPage from '@/pages/farmer/StockPage'
import OrdersPage from '@/pages/farmer/OrdersPage'
import LandingPage from '@/pages/consumer/LandingPage'

// Layouts
import ConsumerLayout from '@/components/layout/ConsumerLayout'
import FarmerLayout from '@/components/layout/FarmerLayout'
import AnalyticsPage from '@/pages/farmer/AnalyticsPage'
import BookkeepingPage from '@/pages/farmer/BookkeepingPage'

import OrderTrackingPage from '@/pages/consumer/OrderTrackingPage'




// ── Route guard ───────────────────────────────────────────────────────────────

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Consumer — public */}
      <Route element={<ConsumerLayout />}>
        <Route path="/"                    element={<LandingPage />} />
        <Route path="/shop"                element={<ShopPage />} />
        <Route path="/products/:slug"      element={<ProductPage />} />
        <Route path="/cart"                element={<CartPage />} />
        <Route path="/checkout"            element={<CheckoutPage />} />
        <Route path="/order/:id/confirmed" element={<OrderConfirmationPage />} />
        <Route path="/order/:id/tracking" element={<OrderTrackingPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
       


      </Route>

      {/* Farmer — protected */}
      <Route
        element={
          <ProtectedRoute>
            <FarmerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard"          element={<DashboardPage />} />
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/dashboard/stock"    element={<StockPage />} />
        <Route path="/dashboard/orders"   element={<OrdersPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/bookkeeping" element={<BookkeepingPage />} />

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
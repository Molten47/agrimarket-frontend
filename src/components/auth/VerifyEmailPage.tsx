import { useEffect, useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '@/config/api'
import { CheckCircle, XCircle, Loader2, Leaf } from 'lucide-react'

export default function VerifyEmailPage() {
  const [params]  = useSearchParams()
  const [status, setStatus]   = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const called = useRef(false)  // ← prevents double call in strict mode

  useEffect(() => {
    if (called.current) return
    called.current = true

    const token = params.get('token')
    if (!token) {
      setStatus('error')
      setMessage('No token provided.')
      return
    }

    api.get(`/auth/verify?token=${token}`)
      .then(r => { setStatus('success'); setMessage(r.data.message) })
      .catch(e => { setStatus('error');  setMessage(e.response?.data?.error?.message ?? 'Verification failed.') })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, oklch(0.92 0.04 140), oklch(0.97 0.012 140))' }}>
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg">
          <Leaf className="h-7 w-7 text-primary-foreground" />
        </div>

        {status === 'loading' && (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
            <h1 className="text-2xl font-bold">Email Verified</h1>
            <p className="text-muted-foreground">{message}</p>
            <Link to="/login"
              className="inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'oklch(0.62 0.16 40)' }}>
              Sign in to your account →
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <XCircle className="w-12 h-12 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground">{message}</p>
            <Link to="/register"
              className="inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'oklch(0.62 0.16 40)' }}>
              Register again →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
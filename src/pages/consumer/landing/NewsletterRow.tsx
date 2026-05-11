import { useState } from 'react'
import { Send } from 'lucide-react'

export default function NewsletterRow() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!email.trim()) return
    console.log('Newsletter signup:', email)
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div style={{
      background: 'var(--primary)',
      padding: 'clamp(40px, 6vw, 72px) clamp(20px, 6vw, 80px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>
        Stay in season
      </p>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--primary-foreground)', margin: 0, lineHeight: 1.15 }}>
        Weekly drops. Fresh harvests.<br />Zero spam.
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
        We'll tell you what's coming in from the farms before it hits the shop — so you never miss the good stuff.
      </p>

      {sent ? (
        <div style={{
          background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 28px',
          color: 'var(--primary-foreground)', fontSize: 15, fontWeight: 600,
        }}>
          🌿 You're on the list. See you next harvest.
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 440 }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="your@email.com"
            style={{
              flex: 1, padding: '13px 18px', borderRadius: 12,
              border: '1.5px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--primary-foreground)',
              fontSize: 14, outline: 'none',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '13px 20px', borderRadius: 12,
              background: 'var(--accent)', border: 'none',
              color: 'var(--accent-foreground)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              fontWeight: 700, fontSize: 14,
              transition: 'transform 0.15s, opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Send size={15} /> Join
          </button>
        </div>
      )}
    </div>
  )
}
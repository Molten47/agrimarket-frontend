import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import FooterDonation from './FooterDonation'

const LINKS = {
  Marketplace: [
    { label: 'Browse the shop',      to: '/shop' },
    { label: 'Find farms by county', to: '/shop' },
    { label: 'Seasonal produce',     to: '/shop' },
    { label: 'Gift a box',           to: '/shop' },
  ],
  Farmers: [
    { label: 'Sell on AgriMarket', to: '/register' },
    { label: 'Farmer dashboard',   to: '/dashboard' },
    { label: 'Pricing & fees',     to: '/register' },
    { label: 'Farmer stories',     to: '/' },
  ],
  Company: [
    { label: 'About us',     to: '/' },
    { label: 'How it works', to: '/' },
    { label: 'Press',        to: '/' },
    { label: 'Contact',      to: '/' },
  ],
}

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  fontSize: 14,
  lineHeight: '2.1',
  display: 'block',
  transition: 'color 0.18s',
}

export default function LandingFooter() {
  return (
    <footer style={{
      background: 'oklch(0.18 0.06 148)',
      borderTop: '1px solid oklch(0.28 0.08 148)',
      padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px) 0',
      overflowX: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Responsive CSS ── */}
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr 1fr 1fr 1.6fr;
            gap: clamp(24px, 3vw, 48px);
            padding-bottom: 56px;
            align-items: start;
          }
          .footer-links-group {
            display: grid;
            grid-column: 2 / 5;
            grid-template-columns: 1fr 1fr 1fr;
            gap: clamp(16px, 3vw, 40px);
          }
          .footer-bottom {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .footer-bottom-links {
            display: flex;
            gap: 24px;
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 36px;
              padding-bottom: 40px;
            }
            .footer-links-group {
              grid-column: 1;
              grid-template-columns: 1fr 1fr;
              gap: 28px 20px;
            }
            .footer-bottom {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            .footer-bottom-links {
              flex-wrap: wrap;
              gap: 16px;
            }
          }

          @media (max-width: 480px) {
            .footer-links-group {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }
        `}</style>

        <div className="footer-grid">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <Leaf size={22} style={{ color: 'oklch(0.72 0.18 145)' }} />
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em', color: '#fff' }}>
                AgriMarket
              </span>
            </Link>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 220, margin: '0 0 24px' }}>
              Connecting British farmers directly with the people who eat their food since 2024.
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 14px 4px 9px',
              background: 'oklch(0.28 0.10 148)', color: '#c8e6b0',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              borderRadius: '62% 38% 55% 45% / 48% 62% 38% 52%',
              border: '1px solid oklch(0.42 0.12 148)',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a3d96c', flexShrink: 0 }} />
              Farm to Table
            </span>
          </div>

          {/* Link columns — grouped so they span correctly on desktop */}
          <div className="footer-links-group">
            {Object.entries(LINKS).map(([heading, items]) => (
              <div key={heading}>
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14,
                }}>
                  {heading}
                </p>
                {items.map(({ label, to }) => (
                  <Link key={label} to={to} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Donation card */}
          <div>
            <FooterDonation />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom" style={{ borderTop: '1px solid oklch(0.28 0.08 148)', padding: '20px 0' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} AgriMarket Ltd. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            {['Privacy policy', 'Terms of service', 'Cookie settings'].map(item => (
              <a key={item} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from './useScrollReveal'

const leafPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '16px 32px', fontSize: 16, fontWeight: 700,
  background: 'var(--chart-3)', color: '#fff', border: 'none',
  cursor: 'pointer', textDecoration: 'none',
  borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
  transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.22s',
}

const leafGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '16px 32px', fontSize: 16, fontWeight: 600,
  background: 'rgba(255,255,255,0.1)', color: '#fff',
  border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', textDecoration: 'none',
  borderRadius: '68% 32% 62% 38% / 44% 56% 44% 56%',
  transition: 'border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.22s, background 0.18s',
}

const truckCSS = `
  @keyframes driveLoop {
    0%   { transform: translateX(-520px); }
    40%  { transform: translateX(0px); }
    70%  { transform: translateX(0px); }
    100% { transform: translateX(520px); }
  }
  @keyframes truckBounce {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-3px); }
  }
  @keyframes wheelSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes farmerWave {
    0%,100% { transform: rotate(-10deg); }
    50%     { transform: rotate(12deg); }
  }
  @keyframes smokeDrift {
    0%   { opacity: 0.5; transform: translate(0,0) scale(1); }
    100% { opacity: 0;   transform: translate(-18px,-20px) scale(1.8); }
  }
  .truck-wrap {
    animation: driveLoop 5s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  .truck-bounce {
    animation: truckBounce 0.45s ease-in-out infinite;
    transform-origin: center bottom;
  }
  .wheel-l { animation: wheelSpin 0.35s linear infinite; transform-box: fill-box; transform-origin: center; }
  .wheel-r { animation: wheelSpin 0.35s linear infinite; transform-box: fill-box; transform-origin: center; }
  .arm     { animation: farmerWave 0.55s ease-in-out infinite; transform-box: fill-box; transform-origin: 0px 0px; }
  .smoke1  { animation: smokeDrift 0.9s ease-out infinite; }
  .smoke2  { animation: smokeDrift 0.9s ease-out 0.3s infinite; }
  .smoke3  { animation: smokeDrift 0.9s ease-out 0.6s infinite; }
`

export default function LandingFarmerCTA() {
  const { revealStyle } = useScrollReveal()

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 520 }}>

      {/* Background video */}
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="https://res.cloudinary.com/dl7y7awmr/video/upload/v1778269228/8540470-hd_1920_1080_30fps_f1wiqw.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(10,28,18,0.88) 0%, rgba(10,28,18,0.65) 55%, rgba(10,28,18,0.45) 100%)',
      }} />

      {/* Decorative rings */}
      <div style={{ position: 'absolute', right: -120, top: -120, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative" style={{ padding: 'clamp(70px, 10vw, 120px) 24px' }}>
        <div id="cta" data-reveal style={revealStyle('cta')}>

          {/* Animated truck */}
          <style>{truckCSS}</style>
          <div style={{ width: '100%', maxWidth: 420, margin: '0 auto 28px', overflow: 'hidden' }}>
            <svg viewBox="0 0 420 100" width="100%" style={{ display: 'block' }}>
              <g className="truck-wrap">
                <g className="truck-bounce">
                  {/* Cab body */}
                  <rect x="110" y="28" width="80" height="52" rx="5" fill="#2d5a27"/>
                  {/* Cab roof */}
                  <path d="M118 28 Q122 8 152 6 Q180 6 188 28 Z" fill="#3a7032"/>
                  {/* Window */}
                  <rect x="126" y="12" width="44" height="22" rx="3" fill="#a8d8ea" opacity="0.85"/>
                  <line x1="130" y1="14" x2="138" y2="33" stroke="white" stroke-width="1.2" opacity="0.4"/>
                  {/* Headlight */}
                  <rect x="104" y="50" width="8" height="6" rx="1" fill="#f9e04b" opacity="0.9"/>
                  {/* Bumper */}
                  <rect x="102" y="58" width="10" height="10" rx="2" fill="#1a3d18"/>
                  {/* Bed */}
                  <rect x="190" y="40" width="108" height="40" rx="3" fill="#3a7032"/>
                  <rect x="194" y="66" width="100" height="6" rx="2" fill="#2d5a27"/>
                  {/* Connector */}
                  <rect x="186" y="42" width="6" height="36" rx="1" fill="#2d5a27"/>

                  {/* Crate 1 */}
                  <rect x="196" y="44" width="30" height="22" rx="2" fill="#8B4513"/>
                  <line x1="211" y1="44" x2="211" y2="66" stroke="#6B3410" stroke-width="1"/>
                  <line x1="196" y1="55" x2="226" y2="55" stroke="#6B3410" stroke-width="1"/>
                  <circle cx="203" cy="50" r="3" fill="#e05c2a"/>
                  <circle cx="211" cy="49" r="2.5" fill="#e8a020"/>
                  <circle cx="220" cy="50" r="3" fill="#c0392b"/>

                  {/* Crate 2 */}
                  <rect x="230" y="44" width="30" height="22" rx="2" fill="#8B4513"/>
                  <line x1="245" y1="44" x2="245" y2="66" stroke="#6B3410" stroke-width="1"/>
                  <line x1="230" y1="55" x2="260" y2="55" stroke="#6B3410" stroke-width="1"/>
                  <circle cx="237" cy="50" r="2.5" fill="#27ae60"/>
                  <circle cx="245" cy="49" r="3" fill="#f1c40f"/>
                  <circle cx="254" cy="50" r="2.5" fill="#27ae60"/>

                  {/* Crate 3 */}
                  <rect x="264" y="48" width="26" height="18" rx="2" fill="#8B4513"/>
                  <circle cx="272" cy="55" r="2.5" fill="#e05c2a"/>
                  <circle cx="281" cy="54" r="3" fill="#8e44ad" opacity="0.85"/>

                  {/* Farmer head */}
                  <circle cx="168" cy="16" r="9" fill="#f5c784"/>
                  {/* Hat */}
                  <rect x="159" y="9" width="18" height="3" rx="1.5" fill="#8B4513"/>
                  <rect x="162" y="-1" width="12" height="12" rx="2" fill="#6B3410"/>
                  <rect x="162" y="7" width="12" height="3" fill="#5a2d0c"/>
                  {/* Body */}
                  <rect x="160" y="25" width="16" height="12" rx="3" fill="#3a7032"/>
                  {/* Waving arm */}
                  <g className="arm" style={{ transformOrigin: '176px 25px' }}>
                    <line x1="176" y1="25" x2="188" y2="16" stroke="#f5c784" stroke-width="3.5" strokeLinecap="round"/>
                    <circle cx="189" cy="14" r="3.5" fill="#f5c784"/>
                  </g>

                  {/* Wheels */}
                  <g className="wheel-l">
                    <circle cx="140" cy="80" r="14" fill="#1a1a1a"/>
                    <circle cx="140" cy="80" r="8" fill="#333"/>
                    <circle cx="140" cy="80" r="3" fill="#888"/>
                    <line x1="140" y1="70" x2="140" y2="90" stroke="#666" stroke-width="1.5"/>
                    <line x1="130" y1="80" x2="150" y2="80" stroke="#666" stroke-width="1.5"/>
                    <line x1="133" y1="73" x2="147" y2="87" stroke="#666" stroke-width="1.5"/>
                    <line x1="147" y1="73" x2="133" y2="87" stroke="#666" stroke-width="1.5"/>
                  </g>
                  <g className="wheel-r">
                    <circle cx="248" cy="80" r="14" fill="#1a1a1a"/>
                    <circle cx="248" cy="80" r="8" fill="#333"/>
                    <circle cx="248" cy="80" r="3" fill="#888"/>
                    <line x1="248" y1="70" x2="248" y2="90" stroke="#666" stroke-width="1.5"/>
                    <line x1="238" y1="80" x2="258" y2="80" stroke="#666" stroke-width="1.5"/>
                    <line x1="241" y1="73" x2="255" y2="87" stroke="#666" stroke-width="1.5"/>
                    <line x1="255" y1="73" x2="241" y2="87" stroke="#666" stroke-width="1.5"/>
                  </g>

                  {/* Smoke puffs */}
                  <circle className="smoke1" cx="106" cy="58" r="4" fill="rgba(200,200,200,0.6)"/>
                  <circle className="smoke2" cx="100" cy="54" r="5" fill="rgba(200,200,200,0.4)"/>
                  <circle className="smoke3" cx="94" cy="50" r="6" fill="rgba(200,200,200,0.25)"/>
                </g>
              </g>

              {/* Ground */}
              <line x1="0" y1="94" x2="420" y2="94" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              <line x1="0" y1="98" x2="420" y2="98" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="18 10"/>
            </svg>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Are you a British farmer?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: 1.75, marginBottom: 36 }}>
            Join hundreds of farms already selling direct through AgriMarket.
            Free to join. No commission on your first 10 orders.
            Set your own prices and keep what you earn.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" style={leafPrimary}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%'; el.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%'; el.style.transform = 'scale(1)' }}
            >
              Start selling today <ArrowRight size={18} />
            </Link>
            <Link to="/shop" style={leafGhost}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '32% 68% 38% 62% / 56% 44% 56% 44%'; el.style.transform = 'scale(1.04)'; el.style.background = 'rgba(255,255,255,0.16)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderRadius = '68% 32% 62% 38% / 44% 56% 44% 56%'; el.style.transform = 'scale(1)'; el.style.background = 'rgba(255,255,255,0.1)' }}
            >
              See what's selling
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
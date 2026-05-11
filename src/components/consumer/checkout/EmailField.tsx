import { darkInputStyle, darkLabelStyle } from './CheckoutStyles'

export function EmailField() {
  return (
    <div>
      <label style={darkLabelStyle}>Email address</label>
      <input
        name="guest_email"
        type="email"
        placeholder="you@example.co.uk"
        style={darkInputStyle}
        required
      />
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', marginTop: '0.3rem' }}>
        Confirmation sent here.
      </p>
    </div>
  )
}
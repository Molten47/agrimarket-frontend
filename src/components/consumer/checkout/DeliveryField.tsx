import { darkInputStyle, darkLabelStyle } from './CheckoutStyles'

export function DeliveryFields() {
  return (
    <>
      <div>
        <label style={darkLabelStyle}>Full name</label>
        <input
          name="delivery_name"
          placeholder="Jane Smith"
          style={darkInputStyle}
          required
        />
      </div>

      <div>
        <label style={darkLabelStyle}>Delivery address</label>
        <textarea
          name="delivery_address"
          placeholder="12 High Street, Springfield"
          rows={2}
          style={{ ...darkInputStyle, resize: 'none' }}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={darkLabelStyle}>County</label>
          <input
            name="delivery_county"
            placeholder="Yorkshire"
            style={darkInputStyle}
            required
          />
        </div>
        <div>
          <label style={darkLabelStyle}>Postcode</label>
          <input
            name="delivery_postcode"
            placeholder="YO1 9XX"
            style={darkInputStyle}
            required
          />
        </div>
      </div>
    </>
  )
}
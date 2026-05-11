interface Props {
  isLoading: boolean
}

export function CheckoutSubmitButton({ isLoading }: Props) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      style={{
        width: '100%',
        padding: '0.65rem',
        borderRadius: '0.6rem',
        background: isLoading ? 'rgba(180,80,30,0.5)' : 'oklch(0.62 0.16 40)',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.9rem',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.15s',
        marginTop: '0.25rem',
      }}
    >
      {isLoading ? 'Placing order...' : 'Place Order →'}
    </button>
  )
}
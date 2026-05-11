import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Stripe, StripeCardElement } from '@stripe/stripe-js'
import { stripePromise } from '@/lib/stripe'
import { ordersApi } from '@/api/orders.api'
import { paymentsApi } from '@/api/payment.api'
import { useCartStore } from '@/store/cart.store'
import { PlaceOrderInput } from '@/types'
import { saveLastOrder } from '@/lib/lastOrder'



type CheckoutStep = 'delivery' | 'payment' | 'processing'

export function useCheckout() {
  const navigate = useNavigate()
  const { sessionKey, clearCart } = useCartStore()

  const [isOpen,        setIsOpen]        = useState(false)
  const [step,          setStep]          = useState<CheckoutStep>('delivery')
  const [error,         setError]         = useState<string | null>(null)
  const [clientSecret,  setClientSecret]  = useState<string | null>(null)
  const [orderId,       setOrderId]       = useState<string | null>(null)
  const [orderKey,      setOrderKey]      = useState<string | null>(null)
  const [stripe,        setStripe]        = useState<Stripe | null>(null)
  const [billingEmail,  setBillingEmail]  = useState('')

  // ── Step 1: place order + create payment intent ──────────────────────────
  const orderMutation = useMutation({
    mutationFn: async (input: PlaceOrderInput) => {
      const order  = await ordersApi.place(input)
      const intent = await paymentsApi.createIntent(order.id, order.order_key)
      return { order, intent }
    },
    onSuccess: async ({ order, intent }) => {
      setOrderId(order.id)
      setOrderKey(order.order_key)
      setClientSecret(intent.client_secret)
      // Use the SAME shared instance that Elements provider uses
      const stripeInstance = await stripePromise
      setStripe(stripeInstance)
      setStep('payment')
      setError(null)
    },
    onError: (err: any) => {
      setError(err?.response?.data?.error ?? 'Failed to place order. Please try again.')
    },
  })

  // ── Step 1 submit: capture email from form before mutating ───────────────
  const handleDeliverySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form  = new FormData(e.currentTarget)
    const email = form.get('guest_email') as string
    setBillingEmail(email)

    orderMutation.mutate({
      order_key:         crypto.randomUUID(),
      session_key:       sessionKey,
      guest_email:       email,
      delivery_name:     form.get('delivery_name') as string,
      delivery_address:  form.get('delivery_address') as string,
      delivery_county:   form.get('delivery_county') as string,
      delivery_postcode: form.get('delivery_postcode') as string,
    })
  }

  // ── Step 2: confirm card payment with Stripe ─────────────────────────────
  const confirmPayment = async (cardElement: StripeCardElement, email: string) => {
    if (!stripe || !clientSecret) {
      setError('Payment not initialised. Please refresh and try again.')
      return
    }

    setStep('processing')
    setError(null)

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card:            cardElement,
        billing_details: { email },
      },
    })

    if (result.error) {
      setError(result.error.message ?? 'Payment failed. Please try again.')
      setStep('payment')
      return
    }

    if (result.paymentIntent?.status === 'succeeded') {
      clearCart()
      // inside confirmPayment, after clearCart():
      saveLastOrder({ id: orderId!, key: orderKey! })
      setIsOpen(false)
      resetState()
      toast.success('Payment successful! Your order is confirmed.')
      navigate(`/order/${orderId}/confirmed?key=${orderKey}`)
    } else {
      setError('Payment was not completed. Please try again.')
      setStep('payment')
    }
  }

  const resetState = () => {
    setStep('delivery')
    setClientSecret(null)
    setOrderId(null)
    setOrderKey(null)
    setStripe(null)
    setError(null)
    setBillingEmail('')
  }

  const openCheckout   = () => { resetState(); setIsOpen(true) }
  const closeCheckout  = () => { setIsOpen(false); resetState() }
  const backToDelivery = () => { setStep('delivery'); setError(null) }

  return {
    isOpen,
    step,
    error,
    billingEmail,
    stripe,
    isLoading: orderMutation.isPending,
    openCheckout,
    closeCheckout,
    backToDelivery,
    handleDeliverySubmit,
    confirmPayment,
  }
}
import { api } from '@/config/api'

export interface CreateIntentResponse {
  client_secret:      string
  payment_intent_id:  string
  amount_pence:       number
}

export const paymentsApi = {
  createIntent: async (
    orderId:  string,
    orderKey: string,
  ): Promise<CreateIntentResponse> => {
    const { data } = await api.post('/payments/intent', {
      order_id:  orderId,
      order_key: orderKey,
    })
    return data
  },
}
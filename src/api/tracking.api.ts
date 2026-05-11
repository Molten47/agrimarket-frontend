import { api } from '@/config/api'

export interface TrackingEvent {
  id:             string
  order_id:       string
  status:         string
  location_label: string | null
  lat:            string | null
  lng:            string | null
  event_time:     string
}

export const trackingApi = {
  get: async (orderId: string, orderKey: string): Promise<TrackingEvent[]> => {
    const { data } = await api.get(`/tracking/${orderId}`, {
      params: { order_key: orderKey },
    })
    return data
  },
}
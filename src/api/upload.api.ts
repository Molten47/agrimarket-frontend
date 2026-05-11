import { api } from '@/config/api'

export const uploadApi = {
  async uploadImage(file: File): Promise<{ image_url: string }> {
    const form = new FormData()
    form.append('image', file)

    const { data } = await api.post('/upload/image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
}
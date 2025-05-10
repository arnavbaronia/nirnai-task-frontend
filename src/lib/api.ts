import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
})

export const processPdf = async (file: File) => {
  const formData = new FormData()
  formData.append('pdf', file)

  const response = await api.post('/process-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export default api
import axios from 'axios'
import { getToken } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL: API_URL,
})

// Add request interceptor to include token
api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
    }
    return Promise.reject(error)
  }
)

export default api
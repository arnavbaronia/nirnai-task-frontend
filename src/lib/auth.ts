import axios from 'axios'
import { LoginFormData, RegisterFormData, AuthResponse, User } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, data)
    return response.data
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/register`, {
      email: data.email,
      password: data.password
    })
    return response.data
  },

  async logout(): Promise<void> {
    await axios.post(`${API_URL}/logout`)
  },

  async getCurrentUser(token: string): Promise<User> {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}
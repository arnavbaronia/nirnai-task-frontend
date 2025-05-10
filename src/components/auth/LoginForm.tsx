// src/components/auth/LoginForm.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { login } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { access_token, user } = await login({ email, password })
      authLogin(access_token, user)
      toast.success('Login successful')
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            id="email"
            label="Email address"
            name="email"
            type="email"
            required
            placeholder="user@example.com"
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
          variant="default"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </div>
    </div>
  )
}
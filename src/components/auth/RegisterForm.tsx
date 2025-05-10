'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { authService } from '@/lib/auth'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' })
      setLoading(false)
      return
    }

    try {
      await authService.register({ email, password, confirmPassword })
      toast.success('Registration successful! Please login.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-gray-900">Create an account</h2>
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
            minLength={8}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            minLength={8}
            error={errors.confirmPassword}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Login here
        </Link>
      </div>
    </div>
  )
}
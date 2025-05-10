'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Stub authentication - replace with real auth later
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Login failed')
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
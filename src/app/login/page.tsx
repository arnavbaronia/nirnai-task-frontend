import LoginForm from '@/components/auth/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Server-side check for existing token
  const token = cookies().get('token')?.value
  if (token) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}
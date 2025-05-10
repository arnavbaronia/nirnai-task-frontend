import LoginForm from '@/components/auth/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  // Proper async cookie handling
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}
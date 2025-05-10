'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/auth'
import { getCurrentUser } from '@/lib/auth'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-hot-toast'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token')
        
        if (storedToken) {
          const user = await getCurrentUser(storedToken)
          setToken(storedToken)
          setUser(user)
          
          // If on login/register page, redirect to dashboard
          if (['/login', '/register'].includes(pathname)) {
            router.push('/dashboard')
          }
        } else {
          // If not on public route, redirect to login
          if (!['/login', '/register'].includes(pathname)) {
            router.push('/login')
          }
        }
      } catch (error) {
        localStorage.removeItem('token')
        if (!['/login', '/register'].includes(pathname)) {
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [pathname, router])

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
    router.push('/dashboard')
  }

  const logout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.push('/login')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
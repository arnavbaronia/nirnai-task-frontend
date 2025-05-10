'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/auth'
import { authService } from '@/lib/auth'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-hot-toast'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: async () => {},
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
      const storedToken = localStorage.getItem('token')
      
      if (storedToken) {
        try {
          const user = await authService.getCurrentUser(storedToken)
          setToken(storedToken)
          setUser(user)
          
          if (['/login', '/register'].includes(pathname)) {
            router.push('/dashboard')
            router.refresh() // Force refresh to sync server state
          }
        } catch (error) {
          localStorage.removeItem('token')
          if (!['/login', '/register'].includes(pathname)) {
            router.push('/login')
          }
        }
      } else if (!['/login', '/register'].includes(pathname)) {
        router.push('/login')
      }
      setLoading(false)
    }

    initializeAuth()
  }, [pathname, router])

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
    router.push('/dashboard')
    router.refresh() // Force refresh to sync server state
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.push('/login')
    router.refresh() // Force refresh to sync server state
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
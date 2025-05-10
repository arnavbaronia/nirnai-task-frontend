'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { Button } from './ui/Button'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-gray-800">
          PDF Extractor
        </Link>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
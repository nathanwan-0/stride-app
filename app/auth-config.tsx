'use client'

import { AuthProvider } from '@saas-ui/auth'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export function AuthConfigProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  // Handle user signup
  const handleSignup = async ({ email, password }: any) => {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Signup failed')

    // Optional: redirect after successful signup
    router.push('/login')
    return data
  }

  // Handle user login
  const handleLogin = async ({ email, password }: any) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Invalid credentials')

    // Store token locally
    localStorage.setItem('token', data.token)

    // Redirect to dashboard (or homepage)
    router.push('/dashboard')
    return data.user
  }

  return (
    <AuthProvider
      onSignup={handleSignup}
      onLogin={handleLogin}
    >
      {children}
    </AuthProvider>
  )
}

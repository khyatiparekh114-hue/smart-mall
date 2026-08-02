"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api } from "@/lib/api"

type User = {
  _id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const data = await api.post("/auth/login", { email, password })
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
  }

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    const data = await api.post("/auth/signup", { name, email, password, phone })
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
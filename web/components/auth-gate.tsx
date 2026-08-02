"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

const PUBLIC_ROUTES = ["/login", "/signup"]

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.replace("/login")
    }
  }, [loading, user, isPublic, router])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!user && !isPublic) {
    return null
  }

  return <>{children}</>
}
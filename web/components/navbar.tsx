"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ScanLine,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/store-provider"
import { useAuth } from "@/contexts/auth-context"

const links = [
  { href: "/products", label: "Shop" },
  { href: "/scan", label: "Scan & Go" },
  { href: "/products", label: "Prebook" },
  { href: "/orders", label: "Orders" },
]

export function Navbar() {
  const pathname = usePathname()
  const { cartCount, wishlist } = useStore()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Nova<span className="text-gradient">Mall</span>
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5",
                  pathname.startsWith(l.href) && "text-foreground bg-white/5",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-2 lg:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search products, stores, brands…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <Link href="/scan" className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Scan and Go">
                <ScanLine className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-cyan text-[10px] font-semibold text-cyan-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="hidden items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs font-medium sm:flex"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                Logout
              </button>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Login
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
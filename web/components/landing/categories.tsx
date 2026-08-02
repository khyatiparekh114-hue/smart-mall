"use client"

import Link from "next/link"
import {
  Cookie,
  CupSoda,
  Soup,
  Sparkles,
  Milk,
  ShoppingBasket,
  Home,
  Package,
  type LucideIcon,
} from "lucide-react"
import { useProducts, deriveCategories } from "@/lib/use-products"
import { Reveal } from "@/components/reveal"

const iconMap: Record<string, LucideIcon> = {
  Snacks: Cookie,
  Beverages: CupSoda,
  "Instant Food": Soup,
  "Personal Care": Sparkles,
  Dairy: Milk,
  Grocery: ShoppingBasket,
  Household: Home,
}

export function Categories() {
  const { products, loading } = useProducts()
  const categories = deriveCategories(products)

  if (loading || categories.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by category</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore everything the mall has to offer.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden text-sm font-medium text-primary hover:underline sm:block"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.name] || Package
          return (
            <Reveal key={cat.id} delay={i * 0.05}>
              <Link
                href={`/products?category=${cat.id}`}
                className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all hover:-translate-y-1 hover:glow-cyan"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-sm font-medium">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.count} items</div>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
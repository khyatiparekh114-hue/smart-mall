"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useProducts } from "@/lib/use-products"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/reveal"

export function Featured() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 8)

  if (loading || featured.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Trending now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Handpicked favorites available right now.
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
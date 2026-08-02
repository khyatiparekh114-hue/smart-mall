"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/components/store-provider"
import { useProducts } from "@/lib/use-products"
import { api } from "@/lib/api"
import { adaptProduct } from "@/lib/product-adapter"
import type { Product } from "@/lib/data"

export function ProductDetail({ id }: { id: string }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const { products } = useProducts()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((data) => setProduct(adaptProduct(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading...</div>
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">{error || "Product not found"}</p>
        <Link href="/products" className="mt-4 inline-block text-sm underline underline-offset-4">
          Back to products
        </Link>
      </div>
    )
  }

  const wished = wishlist.includes(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAdd() {
    addToCart(product!, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const perks = [
    { icon: Truck, label: "Available for Express pickup" },
    { icon: RotateCcw, label: "Easy in-store returns" },
    { icon: ShieldCheck, label: "Quality checked products" },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="capitalize hover:text-foreground">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="text-sm text-muted-foreground">{product.store}</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            {product.inStock ? (
              <Badge variant="success">In stock</Badge>
            ) : (
              <Badge variant="destructive">Out of stock</Badge>
            )}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-semibold">₹{product.price}</span>
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-white/5 p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 gap-2 rounded-full sm:flex-none"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" /> Add to cart
                </>
              )}
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="h-11 w-11 rounded-full"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-primary text-primary")} />
            </Button>
          </div>

          <div className="mt-8 space-y-3 rounded-2xl glass p-5">
            {perks.map((perk) => (
              <div key={perk.label} className="flex items-center gap-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-cyan">
                  <perk.icon className="h-4 w-4" />
                </span>
                {perk.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
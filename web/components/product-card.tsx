"use client"

import Link from "next/link"
import { Star, Heart, Plus, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/components/store-provider"
import type { Product } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const wished = wishlist.includes(product.id)

  return (
    <div className="group glass relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:glow-primary">
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden">
       <img
  src={product.image || "/placeholder.svg"}
  alt={product.name}
  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
/>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {product.badge ? (
            <Badge variant={product.badge === "10 min" ? "cyan" : "primary"}>
              {product.badge === "10 min" && <Zap className="h-3 w-3" />}
              {product.badge}
            </Badge>
          ) : (
            <span />
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-black/30 backdrop-blur-md transition-colors hover:bg-black/50"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            wished ? "fill-primary text-primary" : "text-foreground",
          )}
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{product.store}</span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-balance hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-semibold">₹{product.price}</span>
           {product.oldPrice && (
  <span className="text-xs text-muted-foreground line-through">
    ₹{product.oldPrice}
  </span>
)}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            aria-label="Add to cart"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {!product.inStock && (
          <p className="mt-2 text-xs text-red-300">Out of stock</p>
        )}
      </div>
    </div>
  )
}

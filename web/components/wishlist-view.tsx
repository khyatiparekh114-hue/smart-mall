"use client"

import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/components/store-provider"
import { products } from "@/lib/data"

export function WishlistView() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Heart className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} saved items</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[2rem] glass p-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Heart className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">Your wishlist is empty</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
          <Link href="/products" className="mt-6 inline-block">
            <Button className="gap-2 rounded-full">
              Explore products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

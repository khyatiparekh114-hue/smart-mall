"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal, Search } from "lucide-react"
import { useProducts, deriveCategories } from "@/lib/use-products"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top rated" },
]

export function ProductsBrowser({ initialCategory }: { initialCategory?: string }) {
  const { products, loading, error } = useProducts()
  const categories = useMemo(() => deriveCategories(products), [products])

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string | null>(initialCategory ?? null)
  const [sort, setSort] = useState("featured")

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false
      if (query && !`${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [products, category, query, sort])

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading products...</div>
  }

  if (error) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-red-300">{error}</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">All products</h1>
        <p className="mt-2 text-sm text-muted-foreground">{filtered.length} products</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl glass p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Category
              </h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setCategory(null)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/5",
                    !category && "bg-primary/15 text-primary",
                  )}
                >
                  All categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/5",
                      category === c.id && "bg-primary/15 text-primary",
                    )}
                  >
                    {c.name} <span className="text-xs text-muted-foreground">({c.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {sorts.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={cn(
                  "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5",
                  sort === s.id && "border-primary/40 bg-primary/15 text-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl glass p-14 text-center">
              <p className="text-sm text-muted-foreground">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
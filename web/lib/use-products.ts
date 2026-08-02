"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { adaptProduct } from "@/lib/product-adapter"
import type { Product } from "@/lib/data"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api
      .get("/products")
      .then((data) => setProducts(data.map(adaptProduct)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

export function deriveCategories(products: Product[]) {
  const map = new Map<string, number>()
  products.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1))
  return Array.from(map.entries()).map(([name, count]) => ({ id: name, name, count }))
}
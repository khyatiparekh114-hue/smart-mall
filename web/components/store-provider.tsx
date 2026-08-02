"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { api } from "@/lib/api"
import { adaptProduct } from "@/lib/product-adapter"
import type { Product } from "@/lib/data"

type CartItem = { product: Product; qty: number }

type StoreContextType = {
  cart: CartItem[]
  wishlist: string[]
  cartLoading: boolean
  addToCart: (product: Product, qty?: number) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQty: (id: string, qty: number) => Promise<void>
  clearCart: () => void
  checkout: (pickupSlot?: string) => Promise<any>
  toggleWishlist: (id: string) => void
  cartCount: number
  cartTotal: number
}

const StoreContext = createContext<StoreContextType | null>(null)
const CART_TYPE = "pre_book"

function mapCartItems(items: any[]): CartItem[] {
  return items
    .filter((i) => i.product)
    .map((i) => ({ product: adaptProduct(i.product), qty: i.quantity }))
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartLoading, setCartLoading] = useState(true)
  const [wishlist, setWishlist] = useState<string[]>([])

  const fetchCart = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      setCart([])
      setCartLoading(false)
      return
    }
    try {
      const data = await api.get(`/cart/${CART_TYPE}`)
      setCart(mapCartItems(data.items || []))
    } catch {
      setCart([])
    } finally {
      setCartLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCart()
    const stored = localStorage.getItem("wishlist")
    if (stored) setWishlist(JSON.parse(stored))
  }, [fetchCart])

  const addToCart = useCallback(async (product: Product, qty = 1) => {
    const data = await api.post("/cart/add", {
      productId: product.id,
      quantity: qty,
      cartType: CART_TYPE,
    })
    setCart(mapCartItems(data.items || []))
  }, [])

  const removeFromCart = useCallback(async (id: string) => {
    const data = await api.delete(`/cart/remove/${id}`, { cartType: CART_TYPE })
    setCart(mapCartItems(data.items || []))
  }, [])

  const updateQty = useCallback(async (id: string, qty: number) => {
    const data = await api.put("/cart/update", {
      productId: id,
      quantity: Math.max(1, qty),
      cartType: CART_TYPE,
    })
    setCart(mapCartItems(data.items || []))
  }, [])

  const clearCart = useCallback(() => {
    fetchCart()
  }, [fetchCart])

  const checkout = useCallback(async (pickupSlot?: string) => {
    const data = await api.post("/orders/checkout", {
      cartType: CART_TYPE,
      pickupSlot,
    })
    await fetchCart()
    return data
  }, [fetchCart])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem("wishlist", JSON.stringify(next))
      return next
    })
  }, [])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        checkout,
        toggleWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
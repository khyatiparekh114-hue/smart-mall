"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type CartItem = {
  _id: string
  product: { _id: string; name: string; price: number }
  quantity: number
  priceAtAddition: number
}

export default function ScanCartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState<any>(null)

  const fetchCart = async () => {
    try {
      const data = await api.get("/cart/scan_and_go")
      setItems(data.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load cart")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const removeItem = async (productId: string) => {
    await api.delete(`/cart/remove/${productId}`, { cartType: "scan_and_go" })
    fetchCart()
  }

  const total = items.reduce((sum, i) => sum + i.priceAtAddition * i.quantity, 0)

  const handleCheckout = async () => {
    setError("")
    setPlacing(true)
    try {
      const data = await api.post("/orders/checkout", { cartType: "scan_and_go" })
      setOrder(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed")
    } finally {
      setPlacing(false)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">Loading cart...</div>
  }

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <div className="glass-strong rounded-[2rem] p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">You're all set!</h2>
          <p className="mt-2 text-sm text-muted-foreground">Total paid: ₹{order.totalAmount}</p>

          <div className="mt-6 rounded-2xl bg-white/5 p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Show this at the exit gate
            </p>
            <p className="mt-3 font-mono text-4xl font-bold tracking-widest text-primary">
              {order.exitCode}
            </p>
          </div>

          <Link href="/scan" className="mt-8 inline-block">
            <Button className="gap-2 rounded-full">
              Scan more items <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Scan & Go cart</h1>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      {items.length === 0 ? (
        <div className="rounded-[2rem] glass p-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">No items scanned yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Scan a product barcode to add it here.
          </p>
          <Link href="/scan" className="mt-6 inline-block">
            <Button className="gap-2 rounded-full">
              Start scanning <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl glass p-4">
                <div>
                  <p className="text-sm font-medium">{item.product?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{item.priceAtAddition} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">
                    ₹{item.priceAtAddition * item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-muted-foreground hover:text-red-300"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl glass-strong p-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Button
              size="lg"
              onClick={handleCheckout}
              disabled={placing}
              className="mt-5 w-full gap-2 rounded-full glow-primary"
            >
              {placing ? "Processing..." : "Pay & Get Exit Code"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
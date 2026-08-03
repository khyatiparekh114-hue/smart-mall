"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, CalendarClock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/components/store-provider"
import { PaymentModal } from "@/components/payment-modal"

export function CartView() {
  const { cart, cartLoading, updateQty, removeFromCart, checkout, cartTotal, cartCount } = useStore()

  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [error, setError] = useState("")
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)

 const handleCheckout = () => {
  if (!pickupDate || !pickupTime) {
    setError("Please select a pickup date and time")
    return
  }
  setError("")
  setShowPayment(true)
}

const handlePaymentSuccess = async () => {
  const pickupSlot = new Date(`${pickupDate}T${pickupTime}`).toISOString()
  const data = await checkout(pickupSlot)
  setOrder(data)
}

  if (cartLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">
        Loading your cart...
      </div>
    )
  }

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <div className="glass-strong rounded-[2rem] p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Order placed!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Total paid: ₹{order.totalAmount}
          </p>

          <div className="mt-6 rounded-2xl bg-white/5 p-5 text-left text-sm">
            <p className="flex justify-between py-1">
              <span className="text-muted-foreground">Pickup slot</span>
              <span>{new Date(order.pickupSlot).toLocaleString("en-IN")}</span>
            </p>
            <p className="flex justify-between py-1">
              <span className="text-muted-foreground">Pickup counter</span>
              <span>{order.pickupCounter}</span>
            </p>
            <p className="flex justify-between py-1">
              <span className="text-muted-foreground">Status</span>
              <span className="capitalize">{order.orderStatus}</span>
            </p>
          </div>

          <Link href="/products" className="mt-8 inline-block">
            <Button className="gap-2 rounded-full">
              Continue shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Your cart</h1>

      {cart.length === 0 ? (
        <div className="rounded-[2rem] glass p-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <ShoppingCart className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">Your cart is empty</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Browse the mall and add items you love.
          </p>
          <Link href="/products" className="mt-6 inline-block">
            <Button className="gap-2 rounded-full">
              Start shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 rounded-2xl glass p-4">
                <Link
                  href={`/products/${item.product.id}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
                >
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">{item.product.store}</div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground transition-colors hover:text-red-300"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-border bg-white/5 p-1">
                      <button
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-semibold">
                      ₹{(item.product.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl glass-strong p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-border bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                Pickup slot
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-xs">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time" className="text-xs">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

           <Button
  size="lg"
  onClick={handleCheckout}
  className="mt-5 w-full gap-2 rounded-full glow-primary"
>
  Confirm & Pay <ArrowRight className="h-4 w-4" />
</Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout · Pickup at Smart Mall
            </p>
          </aside>
          {showPayment && (
  <PaymentModal
    amount={cartTotal}
    onSuccess={handlePaymentSuccess}
    onClose={() => setShowPayment(false)}
  />
)}
        </div>
      )}
    </div>
  )
}
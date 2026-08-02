"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PackageSearch, ScanLine, ShoppingBag } from "lucide-react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

type Order = {
  _id: string
  orderType: "scan_and_go" | "pre_book"
  items: { name: string; quantity: number; price: number }[]
  totalAmount: number
  paymentStatus: string
  exitCode?: string
  pickupSlot?: string
  pickupCounter?: string
  orderStatus?: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api
      .get("/orders/my-orders")
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading orders...</div>
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">My orders</h1>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      {orders.length === 0 ? (
        <div className="rounded-[2rem] glass p-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <PackageSearch className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">No orders yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Scan items in-store or pre-book from home to see your orders here.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/scan">
              <Button className="gap-2 rounded-full">
                <ScanLine className="h-4 w-4" /> Scan & Go
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="gap-2 rounded-full">
                <ShoppingBag className="h-4 w-4" /> Pre-Book
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl glass-strong p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
                    {order.orderType === "scan_and_go" ? (
                      <ScanLine className="h-4 w-4" />
                    ) : (
                      <ShoppingBag className="h-4 w-4" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {order.orderType === "scan_and_go" ? "Scan & Go" : "Pre-Book"}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                  {order.paymentStatus}
                </span>
              </div>

              <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                {order.items.map((item, i) => (
                  <p key={i} className="flex justify-between text-muted-foreground">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </p>
                ))}
              </div>

              <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>

              {order.orderType === "scan_and_go" && order.exitCode && (
                <div className="mt-4 rounded-xl bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Exit code</p>
                  <p className="mt-1 font-mono text-2xl font-bold tracking-widest text-primary">
                    {order.exitCode}
                  </p>
                </div>
              )}

              {order.orderType === "pre_book" && (
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-white/5 p-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup slot</p>
                    <p className="mt-0.5">{order.pickupSlot ? formatDate(order.pickupSlot) : "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Counter</p>
                    <p className="mt-0.5">{order.pickupCounter || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="mt-0.5 capitalize">{order.orderStatus}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
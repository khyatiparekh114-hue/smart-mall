"use client"

import { useState } from "react"
import { ShieldCheck, ShieldX, ScanLine, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Result = {
  allowed: boolean
  message: string
  customerName?: string
  items?: { name: string; quantity: number }[]
  totalAmount?: number
}

export default function StaffVerifyPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    setResult(null)
    try {
      const data = await api.post("/orders/verify-exit", { exitCode: code.trim().toUpperCase() })
      setResult({ allowed: true, ...data })
    } catch (err) {
      setResult({
        allowed: false,
        message: err instanceof Error ? err.message : "Verification failed",
      })
    } finally {
      setLoading(false)
      setCode("")
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <div className="mb-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
          <ScanLine className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Exit Gate Verification</h1>
        <p className="mt-1 text-sm text-muted-foreground">Staff use only — check customer exit codes</p>
      </div>

      <form onSubmit={handleVerify} className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code, e.g. EXIT-4821"
          className="flex-1 text-center font-mono text-lg tracking-wider"
          autoFocus
        />
        <Button type="submit" size="lg" disabled={loading} className="gap-2 rounded-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
        </Button>
      </form>

      {result && (
        <div
          className={`mt-8 rounded-3xl p-6 text-center ${
            result.allowed ? "bg-primary/10 border border-primary/30" : "bg-red-500/10 border border-red-500/30"
          }`}
        >
          <span
            className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
              result.allowed ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-300"
            }`}
          >
            {result.allowed ? <ShieldCheck className="h-8 w-8" /> : <ShieldX className="h-8 w-8" />}
          </span>

          <p className="mt-4 text-xl font-semibold">
            {result.allowed ? "Allow Exit" : "Deny Exit"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>

          {result.allowed && result.items && (
            <div className="mt-5 rounded-2xl bg-white/5 p-4 text-left text-sm">
              {result.customerName && (
                <p className="mb-2 font-medium">Customer: {result.customerName}</p>
              )}
              {result.items.map((item, i) => (
                <p key={i} className="flex justify-between text-muted-foreground">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </p>
              ))}
              <p className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
                <span>Total paid</span>
                <span>₹{result.totalAmount}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
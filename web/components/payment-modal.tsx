"use client"

import { useState } from "react"
import { CreditCard, Lock, Loader2, CheckCircle2, Smartphone, Wallet, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PaymentModalProps = {
  amount: number
  onSuccess: () => Promise<void>
  onClose: () => void
}

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", color: "#4285F4" },
  { id: "phonepe", name: "PhonePe", color: "#5F259F" },
  { id: "paytm", name: "Paytm", color: "#00BAF2" },
  { id: "bhim", name: "BHIM UPI", color: "#EF7622" },
]

export function PaymentModal({ amount, onSuccess, onClose }: PaymentModalProps) {
  const [method, setMethod] = useState<"card" | "upi">("card")
  const [upiStep, setUpiStep] = useState<"choose" | "manual">("choose")
  const [selectedApp, setSelectedApp] = useState<string | null>(null)

  const [cardNumber, setCardNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [upiId, setUpiId] = useState("")

  const [error, setError] = useState("")
  const [status, setStatus] = useState<"form" | "redirecting" | "processing" | "success">("form")

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(.{4})/g, "$1 ").trim()
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  const runPayment = async () => {
    setStatus("processing")
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800))
      await onSuccess()
      setStatus("success")
      setTimeout(onClose, 1200)
    } catch (err) {
      setStatus("form")
      setError(err instanceof Error ? err.message : "Payment failed, please try again")
    }
  }

  const handleAppSelect = async (appId: string) => {
    setSelectedApp(appId)
    setError("")
    setStatus("redirecting")
    await new Promise((resolve) => setTimeout(resolve, 1300))
    runPayment()
  }

  const handleCardPay = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const digitsOnly = cardNumber.replace(/\s/g, "")
    if (digitsOnly.length !== 16) {
      setError("Enter a valid 16-digit card number")
      return
    }
    if (!name.trim()) {
      setError("Enter the name on card")
      return
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Enter a valid expiry (MM/YY)")
      return
    }
    if (cvv.length !== 3) {
      setError("Enter a valid 3-digit CVV")
      return
    }

    runPayment()
  }

  const handleUpiIdPay = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
      setError("Enter a valid UPI ID, e.g. name@okhdfcbank")
      return
    }

    runPayment()
  }

  const appLabel = UPI_APPS.find((a) => a.id === selectedApp)?.name

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl glass-strong p-6">
      {status === "success" ? (
  <div className="py-8 text-center">
    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
      <CheckCircle2 className="h-8 w-8" />
    </span>
    <p className="mt-4 text-lg font-semibold">Payment Successful!</p>
    <p className="mt-1 text-sm text-muted-foreground">
      ₹{amount.toFixed(2)} paid{appLabel ? ` via ${appLabel}` : method === "upi" ? " via UPI" : " by card"}
    </p>
    <p className="mt-3 text-xs text-muted-foreground">Redirecting to your order...</p>
  </div>
) : status === "redirecting" ? (
          <div className="py-10 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Redirecting to {appLabel}...</p>
          </div>
        ) : status === "processing" ? (
          <div className="py-10 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              {method === "upi" ? `Waiting for approval${appLabel ? " on " + appLabel : ""}...` : "Processing your payment..."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Complete payment</p>
                <p className="text-xs text-muted-foreground">Test mode · no real charge</p>
              </div>
              <span className="text-lg font-semibold">₹{amount.toFixed(2)}</span>
            </div>

            <div className="mb-5 flex rounded-full border border-border bg-white/5 p-1">
              <button
                type="button"
                onClick={() => {
                  setMethod("card")
                  setError("")
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium transition-colors",
                  method === "card" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <CreditCard className="h-3.5 w-3.5" /> Card
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("upi")
                  setUpiStep("choose")
                  setError("")
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium transition-colors",
                  method === "upi" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <Smartphone className="h-3.5 w-3.5" /> UPI
              </button>
            </div>

            {method === "card" && (
              <form onSubmit={handleCardPay} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="card">Card number</Label>
                  <Input
                    id="card"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name on card</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      inputMode="numeric"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <Button type="submit" size="lg" className="w-full gap-2 rounded-full glow-primary">
                  <Lock className="h-4 w-4" /> Pay ₹{amount.toFixed(2)}
                </Button>
              </form>
            )}

            {method === "upi" && upiStep === "choose" && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">Pay using UPI app</p>
                <div className="grid grid-cols-2 gap-3">
                  {UPI_APPS.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppSelect(app.id)}
                      className="flex items-center gap-2.5 rounded-2xl border border-border bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
                        style={{ backgroundColor: app.color }}
                      >
                        <Wallet className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-medium leading-tight">{app.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setUpiStep("manual")}
                  className="flex w-full items-center justify-between rounded-2xl border border-border bg-white/5 p-3 text-xs font-medium text-muted-foreground hover:bg-white/10"
                >
                  Enter UPI ID manually
                  <ChevronRight className="h-4 w-4" />
                </button>

                {error && <p className="text-sm text-red-300">{error}</p>}
              </div>
            )}

            {method === "upi" && upiStep === "manual" && (
              <form onSubmit={handleUpiIdPay} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setUpiStep("choose")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Back to UPI apps
                </button>
                <div className="space-y-1.5">
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input
                    id="upi"
                    placeholder="yourname@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    autoCapitalize="none"
                  />
                  <p className="text-xs text-muted-foreground">
                    e.g. 9876543210@ybl, name@okaxis, name@paytm
                  </p>
                </div>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <Button type="submit" size="lg" className="w-full gap-2 rounded-full glow-primary">
                  <Smartphone className="h-4 w-4" /> Pay ₹{amount.toFixed(2)} via UPI
                </Button>
              </form>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}
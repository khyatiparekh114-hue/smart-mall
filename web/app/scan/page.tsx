"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { BrowserMultiFormatReader } from "@zxing/browser"
import { ScanLine, Upload } from "lucide-react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

type ScannedProduct = {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  storeSection: string
}

export default function ScanPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState("")
  const [scanning, setScanning] = useState(false)
  const [product, setProduct] = useState<ScannedProduct | null>(null)
  const [error, setError] = useState("")
  const [addingToCart, setAddingToCart] = useState(false)

  const fetchProduct = async (barcode: string) => {
    try {
      setError("")
      const data = await api.get(`/products/barcode/${barcode}`)
      setProduct(data)
    } catch (err) {
      setProduct(null)
      setError(err instanceof Error ? err.message : "Product not found for this barcode")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setProduct(null)
    setScanning(true)

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)

    try {
      const codeReader = new BrowserMultiFormatReader()
      const result = await codeReader.decodeFromImageUrl(imageUrl)
      fetchProduct(result.getText())
    } catch {
      setError("Barcode not detected. Try a clearer, well-lit image.")
    } finally {
      setScanning(false)
    }
  }

  const addToCart = async () => {
    if (!product) return
    setAddingToCart(true)
    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
        cartType: "scan_and_go",
      })
      router.push("/scan-cart")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add to cart")
      setAddingToCart(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary glow-primary">
        <ScanLine className="h-7 w-7" />
      </span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">Scan & Go</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Scan a product barcode as you shop, pay from your phone, and walk out — no billing line.
      </p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      <Button
        size="lg"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanning}
        className="mt-8 gap-2 rounded-full glow-primary"
      >
        <Upload className="h-4 w-4" />
        {scanning ? "Scanning..." : "Upload Barcode Image"}
      </Button>

      {preview && (
        <img
          src={preview || "/placeholder.svg"}
          alt="Barcode preview"
          className="mx-auto mt-8 max-w-xs rounded-2xl border border-border"
        />
      )}

      {error && <p className="mt-5 text-sm text-red-300">{error}</p>}

      {product && (
        <div className="mt-8 rounded-2xl glass-strong p-6 text-left">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-xl font-semibold">₹{product.price}</span>
            <span className="text-muted-foreground">Stock: {product.stock}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Section: {product.storeSection}</p>

          <Button onClick={addToCart} disabled={addingToCart} className="mt-5 w-full gap-2 rounded-full">
            {addingToCart ? "Adding..." : "Add to cart"}
          </Button>
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Ready to leave?{" "}
        <a href="/scan-cart" className="underline underline-offset-4">
          Go to your Scan & Go cart
        </a>
      </p>
    </div>
  )
}
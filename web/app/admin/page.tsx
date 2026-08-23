"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, AlertTriangle, Package, Copy, Check } from "lucide-react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarcodeImage } from "@/components/barcode_image"

type AdminProduct = {
  _id: string
  name: string
  barcode: string
  category: string
  price: number
  stock: number
  storeSection: string
  expiryDate?: string
}

export default function AdminPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [newBarcode, setNewBarcode] = useState("")
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    storeSection: "",
    expiryDate: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await api.get("/products/admin/all")
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.role === "admin") fetchProducts()
  }, [user])

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setNewBarcode("")
    setSubmitting(true)

    try {
      const created = await api.post("/products", {
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        storeSection: form.storeSection,
        expiryDate: form.expiryDate || undefined,
      })
      setMessage(`"${form.name}" added successfully`)
      setNewBarcode(created.barcode)
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        storeSection: "",
        expiryDate: "",
      })
      fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add product")
    } finally {
      setSubmitting(false)
    }
  }

  const copyBarcode = () => {
    navigator.clipboard.writeText(newBarcode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
      setMessage(`"${name}" deleted`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete product")
    }
  }

  const handleRemoveExpired = async () => {
    if (!confirm("Remove all expired products? This cannot be undone.")) return
    try {
      const data = await api.delete("/products/expired/all")
      setMessage(data.message)
      fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove expired products")
    }
  }

  const isExpired = (date?: string) => date && new Date(date) < new Date()

  if (user && user.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-muted-foreground">Access denied — admin only.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Admin Panel</h1>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
      {message && <p className="mb-2 text-sm text-primary">{message}</p>}

     {newBarcode && (
  <div className="mb-6 rounded-2xl glass-strong p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">Generated barcode — print this on the product label</p>
      <Button variant="outline" size="sm" onClick={copyBarcode} className="gap-2 rounded-full">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
    <div className="flex justify-center rounded-xl bg-white p-3">
      <BarcodeImage value={newBarcode} height={70} />
    </div>
  </div>
)}

      {/* Add Product Form */}
      <div className="mb-10 rounded-2xl glass-strong p-6">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
          <Plus className="h-5 w-5" /> Add New Product
        </h2>
        <p className="mb-5 text-xs text-muted-foreground">
          Barcode is generated automatically — no need to enter one.
        </p>

        <form onSubmit={handleAddProduct} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Snacks, Dairy, Grocery..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="storeSection">Store section</Label>
            <Input
              id="storeSection"
              placeholder="Aisle 4"
              value={form.storeSection}
              onChange={(e) => setForm({ ...form, storeSection: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="stock">Stock quantity</Label>
            <Input
              id="stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="expiryDate">Expiry date (optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={submitting} className="sm:col-span-2 rounded-full">
            {submitting ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>

      {/* Product List */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5" /> All Products ({products.length})
        </h2>
        <Button
          variant="outline"
          onClick={handleRemoveExpired}
          className="gap-2 rounded-full border-red-500/40 text-red-300 hover:bg-red-500/10"
        >
          <AlertTriangle className="h-4 w-4" /> Remove All Expired
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading products...</p>
      ) : (
        <div className="space-y-2">
         {products.map((p) => (
  <div
    key={p._id}
    className={`flex items-center justify-between gap-4 rounded-xl p-4 ${
      isExpired(p.expiryDate) ? "glass border border-red-500/40 bg-red-500/5" : "glass"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="shrink-0 rounded-lg bg-white p-1">
        <BarcodeImage value={p.barcode} height={35} />
      </div>
      <div>
        <p className="text-sm font-medium">
          {p.name}{" "}
          {isExpired(p.expiryDate) && (
            <span className="ml-2 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-300">
              EXPIRED
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          ₹{p.price} · Stock: {p.stock}
          {p.expiryDate && ` · Expires: ${new Date(p.expiryDate).toLocaleDateString("en-IN")}`}
        </p>
      </div>
    </div>
    <button
      onClick={() => handleDelete(p._id, p.name)}
      className="shrink-0 text-muted-foreground hover:text-red-300"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
))}
        </div>
      )}
    </div>
  )
}
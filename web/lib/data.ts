export type Product = {
  id: string
  name: string
  brand: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  category: string
  store: string
  image: string
  badge?: string
  description: string
  inStock: boolean
  fastDelivery: boolean
}

export type Category = {
  id: string
  name: string
  icon: string
  count: number
}

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "Smartphone", count: 248 },
  { id: "fashion", name: "Fashion", icon: "Shirt", count: 512 },
  { id: "grocery", name: "Grocery", icon: "ShoppingBasket", count: 890 },
  { id: "home", name: "Home & Living", icon: "Sofa", count: 324 },
  { id: "beauty", name: "Beauty", icon: "Sparkles", count: 176 },
  { id: "sports", name: "Sports", icon: "Dumbbell", count: 143 },
  { id: "toys", name: "Toys & Games", icon: "Gamepad2", count: 98 },
  { id: "books", name: "Books", icon: "BookOpen", count: 267 },
]

export const stores = [
  "Nova Electronics",
  "Urban Threads",
  "FreshMart",
  "Casa Living",
  "Glow Beauty",
  "PeakFit Sports",
]

export const products: Product[] = [
  {
    id: "p1",
    name: "AuraPods Pro Wireless Earbuds",
    brand: "Nova",
    price: 199,
    oldPrice: 249,
    rating: 4.8,
    reviews: 1284,
    category: "electronics",
    store: "Nova Electronics",
    image: "/wireless-earbuds-premium.png",
    badge: "Bestseller",
    description:
      "Immersive spatial audio with adaptive noise cancellation, 32-hour battery life, and a compact wireless charging case.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p2",
    name: "Quantum 4K Smart Monitor 27\"",
    brand: "Nova",
    price: 429,
    oldPrice: 549,
    rating: 4.7,
    reviews: 642,
    category: "electronics",
    store: "Nova Electronics",
    image: "/4k-computer-monitor.png",
    badge: "Deal",
    description:
      "Stunning 4K UHD display with HDR10, 144Hz refresh rate, and razor-thin bezels for an edge-to-edge experience.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p3",
    name: "Eclipse Leather Sneakers",
    brand: "Urban",
    price: 89,
    oldPrice: 120,
    rating: 4.6,
    reviews: 934,
    category: "fashion",
    store: "Urban Threads",
    image: "/white-leather-sneakers.png",
    badge: "New",
    description:
      "Handcrafted premium leather sneakers with memory-foam insoles and a minimalist silhouette for all-day comfort.",
    inStock: true,
    fastDelivery: false,
  },
  {
    id: "p4",
    name: "Merino Wool Overshirt",
    brand: "Urban",
    price: 74,
    rating: 4.5,
    reviews: 312,
    category: "fashion",
    store: "Urban Threads",
    image: "/wool-overshirt-jacket.png",
    description:
      "A versatile mid-layer in soft merino wool, tailored for a modern fit with reinforced stitching.",
    inStock: true,
    fastDelivery: false,
  },
  {
    id: "p5",
    name: "Organic Cold-Pressed Juice Pack",
    brand: "FreshMart",
    price: 24,
    oldPrice: 30,
    rating: 4.4,
    reviews: 156,
    category: "grocery",
    store: "FreshMart",
    image: "/cold-pressed-juice-bottles.png",
    badge: "10 min",
    description:
      "A curated pack of six cold-pressed juices made from organic fruits and vegetables, delivered ice-cold.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p6",
    name: "Artisan Sourdough Bundle",
    brand: "FreshMart",
    price: 18,
    rating: 4.9,
    reviews: 421,
    category: "grocery",
    store: "FreshMart",
    image: "/artisan-sourdough-bread.png",
    badge: "10 min",
    description:
      "Freshly baked sourdough loaves with a crisp crust and airy crumb, baked in small batches daily.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p7",
    name: "Nimbus Lounge Chair",
    brand: "Casa",
    price: 349,
    oldPrice: 449,
    rating: 4.7,
    reviews: 208,
    category: "home",
    store: "Casa Living",
    image: "/modern-lounge-chair.png",
    badge: "Deal",
    description:
      "A sculptural lounge chair with a solid oak frame and plush bouclé upholstery for a cozy reading nook.",
    inStock: true,
    fastDelivery: false,
  },
  {
    id: "p8",
    name: "Aurora Ceramic Table Lamp",
    brand: "Casa",
    price: 68,
    rating: 4.6,
    reviews: 187,
    category: "home",
    store: "Casa Living",
    image: "/ceramic-table-lamp.png",
    description:
      "A handmade ceramic lamp with a warm linen shade that casts a soft, ambient glow across any room.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p9",
    name: "Radiance Vitamin C Serum",
    brand: "Glow",
    price: 42,
    oldPrice: 55,
    rating: 4.8,
    reviews: 976,
    category: "beauty",
    store: "Glow Beauty",
    image: "/vitamin-c-serum-bottle.png",
    badge: "Bestseller",

    description:
      "A brightening serum with 15% vitamin C and hyaluronic acid to revive dull, tired skin.",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p10",
    name: "Velvet Matte Lipstick Set",
    brand: "Glow",
    price: 36,
    rating: 4.5,
    reviews: 543,
    category: "beauty",
    store: "Glow Beauty",
    image: "/matte-lipstick-set.png",
    description:
      "A set of five long-wear matte lipsticks in curated everyday shades with a nourishing formula.",
    inStock: false,
    fastDelivery: false,
  },
  {
    id: "p11",
    name: "ProFlex Adjustable Dumbbells",
    brand: "PeakFit",
    price: 279,
    oldPrice: 329,
    rating: 4.7,
    reviews: 389,
    category: "sports",
    store: "PeakFit Sports",
    image: "/adjustable-dumbbells.png",
    badge: "Deal",
    description:
      "A space-saving pair of adjustable dumbbells ranging from 5 to 52 lbs with a quick-select dial.",
    inStock: true,
    fastDelivery: false,
  },
  {
    id: "p12",
    name: "Trailblazer Running Shoes",
    brand: "PeakFit",
    price: 119,
    rating: 4.6,
    reviews: 712,
    category: "sports",
    store: "PeakFit Sports",
    image: "/trail-running-shoes.png",
    badge: "New",
    description:
      "Lightweight running shoes with responsive foam cushioning and a grippy outsole for any terrain.",
    inStock: true,
    fastDelivery: true,
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export type Order = {
  id: string
  date: string
  status: "Delivered" | "Out for delivery" | "Processing" | "Cancelled"
  total: number
  items: { name: string; qty: number; image: string }[]
}

export const orders: Order[] = [
  {
    id: "SM-10482",
    date: "Jul 18, 2026",
    status: "Out for delivery",
    total: 223,
    items: [
      { name: "AuraPods Pro Wireless Earbuds", qty: 1, image: "/wireless-earbuds-premium.png" },
      { name: "Organic Cold-Pressed Juice Pack", qty: 1, image: "/cold-pressed-juice-bottles.png" },
    ],
  },
  {
    id: "SM-10476",
    date: "Jul 12, 2026",
    status: "Delivered",
    total: 429,
    items: [{ name: 'Quantum 4K Smart Monitor 27"', qty: 1, image: "/4k-computer-monitor.png" }],
  },
  {
    id: "SM-10460",
    date: "Jul 03, 2026",
    status: "Delivered",
    total: 131,
    items: [
      { name: "Eclipse Leather Sneakers", qty: 1, image: "/white-leather-sneakers.png" },
      { name: "Artisan Sourdough Bundle", qty: 2, image: "/artisan-sourdough-bread.png" },
    ],
  },
  {
    id: "SM-10441",
    date: "Jun 24, 2026",
    status: "Cancelled",
    total: 68,
    items: [{ name: "Aurora Ceramic Table Lamp", qty: 1, image: "/ceramic-table-lamp.png" }],
  },
]

export type AppNotification = {
  id: string
  title: string
  body: string
  time: string
  type: "order" | "offer" | "system"
  read: boolean
}

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "Your order is on the way",
    body: "Order SM-10482 is out for delivery and will arrive in 15 minutes.",
    time: "2 min ago",
    type: "order",
    read: false,
  },
  {
    id: "n2",
    title: "Flash deal: 40% off Electronics",
    body: "Nova Electronics is running a lightning sale for the next 3 hours.",
    time: "1 hr ago",
    type: "offer",
    read: false,
  },
  {
    id: "n3",
    title: "Prebook confirmed",
    body: "Your slot at FreshMart for Jul 21, 6:00 PM is confirmed.",
    time: "5 hr ago",
    type: "system",
    read: true,
  },
  {
    id: "n4",
    title: "Price drop on your wishlist",
    body: "Radiance Vitamin C Serum dropped to $42. Grab it before it's gone.",
    time: "1 day ago",
    type: "offer",
    read: true,
  },
]

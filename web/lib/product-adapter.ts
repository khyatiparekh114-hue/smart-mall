import type { Product } from "@/lib/data"

const imageMap: Record<string, string> = {
  "Lays Chips 50g": "/products/lays-chips.jpg",
  "Coca-Cola 500ml": "/products/coca-cola.jpg",
  "Maggi Noodles 70g": "/products/maggi-noodles.jpg",
  "Dove Soap 100g": "/products/dove-soap.jpg",
  "Colgate Toothpaste 100g": "/products/colgate-toothpaste.jpg",
  "Amul Butter 100g": "/products/amul-butter.jpg",
  "Britannia Biscuits 200g": "/products/britannia-biscuits.jpg",
  "Parle-G Biscuits 100g": "/products/parleg-biscuits.jpg",
  "Tata Salt 1kg": "/products/tata-salt.jpg",
  "Fortune Sunflower Oil 1L": "/products/sunflower-oil.jpg",
  "Surf Excel Detergent 1kg": "/products/surf-excel.jpg",
  "Nescafe Coffee 50g": "/products/nescafe-coffee.jpg",
}

export function adaptProduct(dbProduct: any): Product {
  return {
    id: dbProduct._id,
    name: dbProduct.name,
    brand: "Smart Mall",
    price: dbProduct.price,
    rating: 4.5,
    reviews: 0,
    category: dbProduct.category || "General",
    store: dbProduct.storeSection || "Smart Mall",
    image: imageMap[dbProduct.name] || "",
    description: dbProduct.description || "",
    inStock: dbProduct.stock > 0,
    fastDelivery: true,
  }
}
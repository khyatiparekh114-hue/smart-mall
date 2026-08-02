import { SiteShell } from "@/components/site-shell"
import { CartView } from "@/components/cart-view"

export const metadata = {
  title: "Your Cart | Aureus Smart Mall",
}

export default function CartPage() {
  return (
    <SiteShell>
      <CartView />
    </SiteShell>
  )
}

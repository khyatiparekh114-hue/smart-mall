import { SiteShell } from "@/components/site-shell"
import { ProductsBrowser } from "@/components/products-browser"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  return (
    <SiteShell>
      <ProductsBrowser initialCategory={category} />
    </SiteShell>
  )
}

import { SiteShell } from "@/components/site-shell"
import { Hero } from "@/components/landing/hero"
import { Categories } from "@/components/landing/categories"
import { Featured } from "@/components/landing/featured"
import { Features } from "@/components/landing/features"
import { StoresCta } from "@/components/landing/stores-cta"

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Categories />
      <Features />
      <Featured />
      <StoresCta />
    </SiteShell>
  )
}

import Link from "next/link"
import { Sparkles, Globe, AtSign, MessageCircle } from "lucide-react"

const columns = [
  {
    title: "Shop",
    links: ["All Products", "Electronics", "Fashion", "Grocery", "Deals"],
  },
  {
    title: "Experience",
    links: ["Scan & Go", "Prebook a Slot", "Track Order", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Sustainability"],
  },
  {
    title: "Support",
    links: ["Help Center", "Returns", "Shipping", "Contact"],
  },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Nova<span className="text-gradient">Mall</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The future of shopping. Discover, scan, prebook and check out across every store —
              all in one luxurious smart mall.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, AtSign, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/products"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Nova Mall. Crafted for the future of retail.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"
import { ScanLine, CalendarClock, Truck, ShieldCheck, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const features = [
  {
    icon: ScanLine,
    title: "Scan & Go",
    desc: "Scan items with your phone and walk out. No queues, no waiting — payment happens automatically.",
    href: "/scan",
    accent: "cyan",
  },
 {
  icon: CalendarClock,
  title: "Prebook a slot",
  desc: "Browse products from home, pay online, and pick up your order at an express counter.",
  href: "/products",
  accent: "primary",
},
 {
  icon: Truck,
  title: "Express pickup",
  desc: "Pre-book your order online and collect it packed and ready at an express counter.",
  href: "/products",
  accent: "cyan",
},
  {
    icon: ShieldCheck,
    title: "Buyer protection",
    desc: "Every order is protected with easy returns and secure, encrypted payments.",
    href: "/products",
    accent: "primary",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-balance">
            A smarter way to shop the mall
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground text-pretty">
            Every feature is designed to save you time and make shopping feel effortless.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Link
              href={f.href}
              className="group flex h-full flex-col rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:glow-primary"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl ${
                  f.accent === "cyan" ? "bg-cyan/15 text-cyan" : "bg-primary/15 text-primary"
                }`}
              >
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

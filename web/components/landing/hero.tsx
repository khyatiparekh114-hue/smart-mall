"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, ScanLine, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/lib/use-products"

export function Hero() {
  const { products } = useProducts()
  const categoryCount = new Set(products.map((p) => p.category)).size

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Badge variant="cyan" className="mb-5">
                <Star className="h-3 w-3 fill-current" />
                The #1 smart shopping experience
              </Badge>

              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Shop the entire mall,{" "}
                <span className="text-gradient">
                  reimagined
                </span>{" "}
                for the future.
              </h1>

              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Discover thousands of products across every store.
                Scan &amp; Go, prebook your slot, and check out in
                seconds — all in one beautifully unified experience.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/products">
                  <Button size="lg" className="gap-2 rounded-full">
                    Start Shopping
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/scan">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 rounded-full"
                  >
                    <ScanLine className="h-4 w-4" />
                    Try Scan &amp; Go
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  {
                    value: `${products.length}+`,
                    label: "Products",
                  },
                  {
                    value: `${categoryCount}`,
                    label: "Categories",
                  },
                  {
                    value: "0 min",
                    label: "Wait time",
                  },
                  {
                    value: "100%",
                    label: "Line-free",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] glass-strong glow-primary">
              <img
                src="/hero-shopping.png"
                alt="Futuristic smart shopping mall interior"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl glass-strong p-4 sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/20 text-cyan">
                  <ScanLine className="h-5 w-5" />
                </span>

                <div>
                  <div className="text-sm font-semibold">
                    Scan &amp; Go
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Skip the checkout line
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}   
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

export function StoresCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 text-center sm:p-14">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to experience the <span className="text-gradient">future of shopping?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
              Join shoppers enjoying a faster, smarter, line-free mall experience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-full">
                  Create free account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="rounded-full">
                  Browse products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
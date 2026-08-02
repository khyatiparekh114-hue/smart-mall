import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/20 text-primary-foreground',
        primary: 'border-primary/30 bg-primary/15 text-foreground',
        cyan: 'border-cyan/30 bg-cyan/15 text-cyan',
        outline: 'border-border bg-white/5 text-foreground',
        success: 'border-transparent bg-emerald-400/15 text-emerald-300',
        warning: 'border-transparent bg-amber-400/15 text-amber-300',
        destructive: 'border-transparent bg-destructive/20 text-red-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

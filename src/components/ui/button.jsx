import { forwardRef } from "react"
import { cva } from "class-variance-authority"
import { clsx } from "clsx"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-500",
        secondary: "bg-white/10 text-slate-100 hover:bg-white/15",
        outline: "border border-white/15 bg-transparent text-slate-100 hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const Button = forwardRef(({ className, variant, ...props }, ref) => {
  return <button ref={ref} className={clsx(buttonVariants({ variant }), className)} {...props} />
})

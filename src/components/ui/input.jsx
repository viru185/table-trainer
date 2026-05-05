import { forwardRef } from "react"
import { clsx } from "clsx"

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
      className
    )}
    {...props}
  />
))

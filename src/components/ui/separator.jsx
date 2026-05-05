import { clsx } from "clsx"

export const Separator = ({ className, ...props }) => (
  <div className={clsx("h-px w-full bg-white/10", className)} {...props} />
)

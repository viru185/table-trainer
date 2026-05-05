import { clsx } from "clsx"

export const Badge = ({ className, ...props }) => (
  <span className={clsx("inline-flex rounded-full px-3 py-1 text-xs font-semibold", className)} {...props} />
)

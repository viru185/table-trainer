import { clsx } from "clsx"

export const Label = ({ className, ...props }) => (
  <label className={clsx("block text-sm font-medium text-slate-200", className)} {...props} />
)

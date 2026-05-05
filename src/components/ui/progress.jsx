import { clsx } from "clsx"

export const Progress = ({ value = 0, className, ...props }) => (
  <div className={clsx("relative h-2 overflow-hidden rounded-full bg-white/10", className)} {...props}>
    <div
      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
)

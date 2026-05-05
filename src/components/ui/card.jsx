import { clsx } from "clsx"

export const Card = ({ className, children, ...props }) => (
  <div className={clsx("overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur", className)} {...props}>
    {children}
  </div>
)

export const CardHeader = ({ className, children, ...props }) => (
  <div className={clsx("space-y-2 px-6 pt-6", className)} {...props}>
    {children}
  </div>
)

export const CardContent = ({ className, children, ...props }) => (
  <div className={clsx("px-6 pb-6", className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ className, children, ...props }) => (
  <h2 className={clsx("text-xl font-semibold text-white", className)} {...props}>
    {children}
  </h2>
)

export const CardDescription = ({ className, children, ...props }) => (
  <p className={clsx("text-sm text-slate-300", className)} {...props}>
    {children}
  </p>
)

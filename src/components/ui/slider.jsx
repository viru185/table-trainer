import { forwardRef } from "react"
import { clsx } from "clsx"

export const Slider = forwardRef(({ value = [0], min = 0, max = 100, step = 1, onValueChange, className, ...props }, ref) => {
  const currentValue = Array.isArray(value) ? value[0] : value

  const handleChange = (event) => {
    const numeric = Number(event.target.value)
    onValueChange?.([numeric])
  }

  return (
    <input
      ref={ref}
      type="range"
      value={currentValue}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      className={clsx(
        "w-full appearance-none rounded-full bg-white/10 accent-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        className
      )}
      {...props}
    />
  )
})

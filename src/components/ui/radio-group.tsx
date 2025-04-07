import * as React from "react"
import { Circle } from 'lucide-react'
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function RadioGroup({
  options,
  value,
  onValueChange,
  className,
}: RadioGroupProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <div
            role="radio"
            aria-checked={value === option.value}
            tabIndex={0}
            onClick={() => onValueChange(option.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onValueChange(option.value)
              }
            }}
            className={cn(
              "h-4 w-4 rounded-full border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
              value === option.value ? "border-2" : ""
            )}
          >
            {value === option.value && (
              <div className="flex h-full w-full items-center justify-center">
                <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
              </div>
            )}
          </div>
          <label
            className="text-sm font-medium leading-none cursor-pointer"
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "peer h-4 w-4 rounded-full border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroupItem }

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false)

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleClick = () => {
      const newValue = !isChecked
      setIsChecked(newValue)
      onCheckedChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleClick()
      }
    }

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isChecked && "bg-primary",
          className,
        )}
        {...props}
      >
        {isChecked && (
          <div className="flex h-full items-center justify-center text-primary-foreground">
            <Check className="h-3 w-3" />
          </div>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }


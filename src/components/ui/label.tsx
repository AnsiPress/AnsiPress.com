import * as React from "react"

function Label({ className = "", ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}

export { Label }

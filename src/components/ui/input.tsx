import * as React from "react"

function Input({ className = "", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  )
}

export { Input }

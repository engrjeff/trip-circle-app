"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface OptionItem {
  value: string
  label: string
}

interface AppComboboxProps {
  options: OptionItem[]
  label: string
  inputPlaceholder?: string
  value?: string
  onValueChange: (val: string | undefined) => void
  renderEmpty?: (search: string) => React.ReactNode
  disabled?: boolean
  fullwidth?: boolean
  className?: string
}

export function AppCombobox({
  options,
  label,
  inputPlaceholder = "Search",
  value,
  onValueChange,
  renderEmpty,
  disabled,
  fullwidth = true,
  className,
}: AppComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const [search, setSearch] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "focus-visible:ring-primary focus-visible::border-primary active:border-primary active:ring-primary h-9 w-full flex-1 justify-between bg-transparent font-normal",
            className
          )}
          disabled={disabled}
        >
          {value
            ? (options.find((option) => option.value === value)?.label ?? label)
            : label}
          <ChevronDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full overflow-hidden rounded-lg p-0"
        align="start"
        style={{
          width: fullwidth ? "var(--radix-popover-trigger-width)" : "100%",
        }}
      >
        <Command
          filter={(value, search) => {
            if (
              options
                .find((i) => i.value === value)
                ?.label.toLowerCase()
                .includes(search.toLowerCase())
            )
              return 1
            return 0
          }}
        >
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={inputPlaceholder}
            className="h-9"
            autoFocus={false}
          />
          <CommandEmpty
            className={cn(renderEmpty ? "p-2" : "py-6 text-center text-sm")}
          >
            {renderEmpty ? <>{renderEmpty(search)}</> : "No item found"}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto size-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

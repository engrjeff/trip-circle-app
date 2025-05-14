"use client"

import React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [passwordShown, setPasswordShown] = React.useState(false)

    return (
      <div className="relative">
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Enter your password"
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          aria-label={passwordShown ? "Hide password" : "Show password"}
          onClick={() => setPasswordShown((state) => !state)}
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 size-7 -translate-y-1/2 hover:border"
          tabIndex={-1}
        >
          {passwordShown ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

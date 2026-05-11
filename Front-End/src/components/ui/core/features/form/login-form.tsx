import { Button } from "@/components/ui/fragments/shadcn/button"
import { FieldGroup } from "@/components/ui/fragments/shadcn/field"
import { Spinner } from "@/components/ui/fragments/shadcn/spinner"
import type { LoginReturnType } from "@/hooks/use-auth"
import { Email, Key, Password } from "@hugeicons/core-free-icons"
import React from "react"

type componentProps = {
  form: LoginReturnType
  isLoading: boolean
}

export default function LoginForm({ form, isLoading }: componentProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-8"
    >
      <FieldGroup>
        <form.AppField name="email">
          {(field) => (
            <field.Input
              leftIcon={Email}
              type="email"
              placeholder="example@gmail.com"
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.Input
              leftIcon={Key}
              type="password"
              placeholder="Password"
            />
          )}
        </form.AppField>
      </FieldGroup>
      <Button
        type="submit"
        size={"default"}
        variant={"outline"}
        className="w-full cursor-pointer rounded-sm text-sm"
        disabled={isLoading}
      >
        <span className="font-bold">Login</span>
        {isLoading && (
          <>
            <Spinner className="text-primary" />
          </>
        )}
      </Button>
    </form>
  )
}

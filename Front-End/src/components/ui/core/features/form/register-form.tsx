import { Button } from "@/components/ui/fragments/shadcn/button"
import { FieldGroup } from "@/components/ui/fragments/shadcn/field"
import { Spinner } from "@/components/ui/fragments/shadcn/spinner"
import type { registerReturnType } from "@/hooks/use-auth"
import { Email, Key, User } from "@hugeicons/core-free-icons"
import React from "react"

type componentProps = {
  form: registerReturnType
  isPending: boolean
}

const RegisterForm = ({ form, isPending }: componentProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className=""
    >
      <FieldGroup className="mb-3 flex-row gap-4">
        <form.AppField name="email">
          {(field) => (
            <field.Input
              leftIcon={Email}
              className=""
              placeholder="Email"
              type="email"
            />
          )}
        </form.AppField>
        <form.AppField name="name">
          {(field) => <field.Input placeholder="Name" leftIcon={User} />}
        </form.AppField>
      </FieldGroup>
      <FieldGroup className="mb-8">
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
        disabled={isPending}
      >
        <span className="font-bold">Register</span>
        {isPending && (
          <>
            <Spinner className="text-primary" />
          </>
        )}
      </Button>
    </form>
  )
}

export default RegisterForm

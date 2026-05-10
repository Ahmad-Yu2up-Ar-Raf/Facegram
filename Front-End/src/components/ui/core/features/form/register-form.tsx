import { Button } from "@/components/ui/fragments/shadcn/button"
import { FieldGroup } from "@/components/ui/fragments/shadcn/field"
import { Spinner } from "@/components/ui/fragments/shadcn/spinner"
import type { UseRegisterType } from "@/hooks/form/use-auth-form"
import { Email, Key, User } from "@hugeicons/core-free-icons"
import React from "react"

type componentProps = {
  form: UseRegisterType
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
      <FieldGroup className="flex flex-row gap-4 [&_input]:text-xs [&_input]:sm:text-sm">
        <form.AppField name="email">
          {(field) => (
            <field.Input
              leftIcon={Email}
              className="rounded-none border-0 border-b bg-background [&_input]:border-0 [&_input]:pr-5 [&_input]:pl-13"
              placeholder="Email"
              type="email"
            />
          )}
        </form.AppField>
        <form.AppField name="name">
          {(field) => (
            <field.Input
              placeholder="Name"
              leftIcon={User}
              className="rounded-none border-0 border-b bg-background [&_input]:border-0 [&_input]:pr-5 [&_input]:pl-13"
            />
          )}
        </form.AppField>
      </FieldGroup>
      <FieldGroup className="mb-4 gap-4 [&_input]:text-xs [&_input]:sm:text-sm">
        <form.AppField name="password">
          {(field) => (
            <field.Input
              leftIcon={Key}
              className="rounded-none border-0 border-b bg-background [&_input]:border-0 [&_input]:px-13"
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
        className="w-full cursor-pointer rounded-sm text-base"
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

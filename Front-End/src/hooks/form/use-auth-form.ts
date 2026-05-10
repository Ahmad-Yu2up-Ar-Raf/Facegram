import {
  loginSchema,
  registerSchema,
  type LoginSchema,
} from "@/lib/validations/auth-validation"
import { useAppForm } from "./use-form"
import { api } from "@/api/client"
import type { AuthResponse } from "@/types/auth-types"
import { setLogin } from "@/store/use-auth-store"

type useAuthComponent = {
  onSucces: (data: AuthResponse) => void | Promise<void>
  onError: (error: Error) => void
}

export type LoginReturnType = ReturnType<typeof useLoginForm>

export const useLoginForm = ({ ...props }: useAuthComponent) => {
  return useAppForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value: data }) => {
      try {
        const result = await api
          .post("auth/login", { json: data })
          .json<AuthResponse>()
        setLogin(result)
        props.onSucces(result)
      } catch (error) {
        const message = error instanceof Error ? error.message : error
        console.log(message)
        props.onError(error as Error)
        throw error
      }
    },
  })
}

export type UseRegisterType = ReturnType<typeof useRegisterForm>

export const useRegisterForm = ({ onSucces, onError }: useAuthComponent) => {
  return useAppForm({
    validators: {
      onSubmit: registerSchema,
    },
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value: data }) => {
      try {
        const result = await api
          .post("auth/register", { json: data })
          .json<AuthResponse>()

        setLogin(result)

        onSucces(result)
      } catch (error) {
        const message = error instanceof Error ? error.message : error
        console.log(message)
        onError(error as Error)
        throw error
      }
    },
  })
}

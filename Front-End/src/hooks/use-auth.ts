import { loginSchema, registerSchema } from "@/lib/validations/auth-validation"
import { useAppForm } from "./form/use-form"
import { api } from "@/api/client"
import type { AuthResponse } from "@/types/auth-types"
import { setLogin, setLogout } from "@/store/use-auth-store"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export type useAuthType = ReturnType<typeof useAuth>

export type loginReturnType = ReturnType<useAuthType["handleLogin"]>
export type registerReturnType = ReturnType<useAuthType["handleRegister"]>
export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleLogin = () => {
    return useAppForm({
      validators: {
        onSubmit: loginSchema,
      },
      defaultValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ value: data }) => {
        const login = api
          .post("auth/login", { json: data })
          .json<AuthResponse>()

        toast.promise(login, {
          success: (data) => {
            navigate("/")
            return `Welcome back ${data.user.name}`
          },
          error: (err) => {
            return err.message || "Error login"
          },

          loading: "Login...",
        })

        await login
      },
    })
  }
  const handleRegister = () => {
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
        const promise = api
          .post("auth/register", { json: data })
          .json<AuthResponse>()

        toast.promise(promise, {
          loading: "Login...",
          success: (data) => {
            setLogin(data)
            navigate("/")
            return `Welcome back ${data.user.name}`
          },
          error: (err) => err.message,
        })

        await promise
      },
    })
  }
  const handleLogout = async () => {
    const logoutAction = async () => {
      queryClient.clear()
      const result = await api.post("auth/logout").json<{ message: string }>()
      setLogout()

      if (!result) {
        throw new Error("Failed to logout")
      }

      navigate("/login")
      return result
    }

    return toast.promise(logoutAction(), {
      loading: "LogOut...",
      success: "Succes Logout!",
      error: (err) => {
        return err.message || "Failed to log out"
      },
    })
  }

  return { handleLogout, handleLogin, handleRegister }
}

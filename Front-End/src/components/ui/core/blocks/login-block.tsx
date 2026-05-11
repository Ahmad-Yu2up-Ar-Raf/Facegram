import { useLoginForm } from "@/hooks/use-auth"

import { toast } from "sonner"
import { AuthLayout } from "../layout/auth-layout"
import LoginForm from "../features/form/login-form"
import { useNavigate } from "react-router-dom"

const LoginBlock = () => {
  const navigate = useNavigate()
  const form = useLoginForm({
    onSucces() {
      navigate("/")
      toast.success("Login Succes!")
    },
    onError: (error: Error) => {
      toast.error("Failed to login link", {
        description: error.message,
      })
    },
  })
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <AuthLayout
          formType="login"
          loading={isSubmitting}
          numberOfIterations={10}
          // title={"Selamat datang  "}
          // description={"Perjalanan akan segera dimulai"}
          //   className={cn(
          //     "h-svh lg:max-w-none",
          //     emailSent && "[&_header]:sr-only"
          //   )}
        >
          <LoginForm form={form} isLoading={isSubmitting} />
        </AuthLayout>
      )}
    </form.Subscribe>
  )
}
export default LoginBlock

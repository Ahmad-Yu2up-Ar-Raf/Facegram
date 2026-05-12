import { useAuth } from "@/hooks/use-auth"

import { AuthLayout } from "../layout/auth-layout"
import LoginForm from "../features/form/login-form"

const LoginBlock = () => {
  const { handleLogin } = useAuth()

  const form = handleLogin()
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

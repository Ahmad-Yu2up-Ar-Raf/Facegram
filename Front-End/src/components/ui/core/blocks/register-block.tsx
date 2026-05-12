import { useAuth } from "@/hooks/use-auth"

 
import { AuthLayout } from "../layout/auth-layout"
import RegisterForm from "../features/form/register-form"

const RegisterBlock = () => {

  const { handleRegister } = useAuth()

  const form = handleRegister()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <AuthLayout
          title="Let's Get Started!"
          formType="register"
          loading={isSubmitting}
        >
          <RegisterForm isPending={isSubmitting} form={form} />
        </AuthLayout>
      )}
    </form.Subscribe>
  )
}

export default RegisterBlock

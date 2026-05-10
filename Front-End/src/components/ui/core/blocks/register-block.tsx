import { useRegisterForm } from "@/hooks/form/use-auth-form"

import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AuthLayout } from "../layout/auth-layout"
import RegisterForm from "../features/form/register-form"

const RegisterBlock = () => {
  const navigate = useNavigate()
  const form = useRegisterForm({
    onSucces() {
      navigate("/")
      toast.success("Succes register!")
    },
    onError: (error: Error) => {
      toast.error("Error while register", {
        description: error.message,
      })
    },
  })
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

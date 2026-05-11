import type React from "react"

import { FullWidthDivider } from "@/components/ui/fragments/shadcn/full-width-divider"
import { Button, buttonVariants } from "@/components/ui/fragments/shadcn/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/fragments/shadcn/input-group"
import { AuthDivider } from "@/components/auth-divider"
import { HugeiconsIcon } from "@hugeicons/react"
import { AtIcon } from "@hugeicons/core-free-icons"
import { LogoAdaptive } from "../../fragments/icons/logo-app"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { DecorIcon } from "../../fragments/icons/decor-icon"

type AuthLayoutProps = {
  children?: React.ReactNode
  title?: string
  description?: string
  quote?: string
  loading?: boolean
  className?: string
  numberOfIterations?: number
  formType?: "login" | "register" | undefined // ✅ Allow undefined
  signInGoogleButton?: boolean
}

export function AuthLayout({
  children,
  formType,
  loading,
  title = "Welcome!",
  description,
}: AuthLayoutProps) {
  const formTypeLabel = formType == "register" ? "Login" : "Register"
  const formTypeLink = formType == "register" ? "/login" : "/register"
  return (
    <div className="relative w-full overflow-hidden px-4 md:h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center border-x *:px-6">
        <div className="flex flex-col space-y-6">
          {/* <div className="absolute top-0 right-1/2 left-1/2 m-auto flex w-full -translate-x-24 transform items-center gap-3 py-4">
            <LogoAdaptive className="scale-[.70]" />
            <h1 className="text-lg font-bold">FoggyNotion</h1>
          </div> */}
          <LogoAdaptive className="m-auto mb-6" />
          <div className="space-y-1 text-center">
            <h1 className="text-xl font-semibold tracking-wide">{title}</h1>
            <p className="text-sm text-muted-foreground">
              {/* <Link
                to={"/login"}
                className={cn(
                  formType == "login" &&
                    "underline underline-offset-4 hover:text-primary",

                  loading
                    ? "pointer-events-none cursor-none text-foreground/50"
                    : ""
                )}
              >
                Log in{" "}
              </Link>{" "} */}
              {formType === "login"
                ? " Don't have an account?"
                : "Allready have an account?"}

              <Link
                to={formTypeLink}
                className={cn(
                  "underline underline-offset-4 hover:text-primary",

                  loading &&
                    "pointer-events-none cursor-none text-foreground/50"
                )}
              >
                {" "}
                {formTypeLabel}.{" "}
              </Link>
            </p>
          </div>
        </div>

        <div className="relative my-8 flex size-full flex-col gap-4 pt-9 pb-13">
          <FullWidthDivider position="top" />
          <DecorIcon className="left-0 z-50" position="top-left" />
          <DecorIcon className="rigth-0 z-50" position="top-right" />
          {children}
          {/* <Button className="w-full" type="button" variant="outline">
            <GoogleIcon data-icon="inline-start" />
            Continue with Google
          </Button> */}
          {/* <AuthDivider>OR CONTINUE WITH EMAIL</AuthDivider> */}
          {/* <form className="space-y-2">
            <InputGroup>
              <InputGroupInput
                aria-label="Email address"
                placeholder="your.email@example.com"
                type="email"
              />
              <InputGroupAddon align="inline-start">
                <HugeiconsIcon icon={AtIcon} strokeWidth={2} />
              </InputGroupAddon>
            </InputGroup>

            <Button className="w-full" size="sm" type="submit">
              Continue With Email
            </Button>
          </form> */}
          <DecorIcon className="left-0 z-50" position="bottom-left" />
          <DecorIcon className="rigth-0 z-50" position="bottom-right" />
          <FullWidthDivider position="bottom" />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            className={cn(
              "underline underline-offset-4 hover:text-primary",
              loading && "pointer-events-none cursor-none text-muted-foreground"
            )}
            to="#"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className={cn(
              "underline underline-offset-4 hover:text-primary",
              loading &&
                "pointer-events-none cursor-none text-foreground/50 capitalize"
            )}
            to="#"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </div>
    </div>
  )
}

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
)

"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { MailCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormDescription, FormMessage } from "@/components/ui/form"
import logoImg from "../../../../public/cypresslogo.svg"
import googleImg from "../../../../public/google.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Loader from "@/components/Loader"
import { actionSignUpUser } from "@/lib/serverActions"
import { FormSchema } from "@/lib/types"
import clsx from "clsx"

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({
      message: "Invalid Email",
    }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return ""
    return searchParams.get("error_description")
  }, [searchParams])

  const [submitError, setSubmitError] = useState<string>("")
  const [confirmation, setConfirmation] = useState<boolean>(false)

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError],
  )

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    const { error, data } = await actionSignUpUser({ email, password })
    if (error) {
      setSubmitError(error.message)
      form.reset()
      return
    }
    setConfirmation(true)
  }

  const signUpHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    router.push("/auth/signup")
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("")
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-6 sm:w-[400px] sm:justify-center "
      >
        <Link href="/" className="justify-left flex w-full items-center">
          <Image src={logoImg} alt="Cypress Logo" width={50} height={50} />
          <span className="ml-2 text-4xl font-semibold dark:text-white">
            cypress.
          </span>
        </Link>
        <FormDescription className=" text-foreground/60">
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>

        {!confirmation && !codeExchangeError && (
          <>
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
            {submitError && <FormMessage>{submitError}</FormMessage>}
            <span className="self-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </span>
            <hr className="border-1 border-muted-foreground/30"></hr>
            {/* WIP */}
            <Button
              type="button"
              className="relative w-full p-6"
              onClick={signUpHandler}
              size="lg"
              variant="outline"
            >
              <Image src={googleImg} alt="" className="mr-2 size-6" />
              Sign up with Google
            </Button>
          </>
        )}
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="h-4 w-4" />}
              <AlertTitle className="">
                {codeExchangeError ? "Invalid Link" : "Check your email."}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || "An email confirmation has been sent."}
              </AlertDescription>
            </Alert>
            {codeExchangeError && (
              <span className="self-center">
                Try again?{" "}
                <Link href="/signup" className="text-primary">
                  Sign Up
                </Link>
              </span>
            )}
          </>
        )}
      </form>
    </Form>
  )
}

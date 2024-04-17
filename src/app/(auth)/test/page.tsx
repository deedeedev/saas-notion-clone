"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { MailCheck } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import logoImg from "../../../../public/cypresslogo.svg"
import googleImg from "../../../../public/google.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Loader from "@/components/Loader"
import { actionSignUpUser } from "@/lib/serverActions"
import clsx from "clsx"

export const SignUpFormSchema = z
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

export default function SignUpPage() {
  const [submitError, setSubmitError] = useState<string>("")
  const [confirmation, setConfirmation] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return ""
    return searchParams.get("error_description")
  }, [searchParams])

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

  const onSubmit: SubmitHandler<z.infer<typeof SignUpFormSchema>> = async (
    formData,
  ) => {
    console.log("BBBBB")
    // const { error } = await actionSignUpUser(formData)

    // if (error) {
    //   form.reset()
    //   setSubmitError(error)
    // } else {
    //   setConfirmation(true)
    // }

    // router.refresh()
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Create Account" : <Loader />}
        </Button>
      </form>
    </Form>
  )
}

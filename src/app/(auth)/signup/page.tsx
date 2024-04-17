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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import logoImg from "../../../../public/cypresslogo.svg"
import googleImg from "../../../../public/google.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Loader from "@/components/Loader"
import { actionSignUpUser } from "@/lib/serverActions"
import clsx from "clsx"

export const SignUpFormSchema = z
  .object({
    fullName: z
      .string()
      .describe("Full Name")
      .max(30, "Name must be less than 30 characters")
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"), "No special characters allowed!")
      .optional(),
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
    accepted: z.literal(true, {
      errorMap: () => ({ message: "Please accept all terms" }),
    }),
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
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof SignUpFormSchema>> = async (
    formData,
  ) => {
    const { confirmPassword, accepted, ...user } = formData

    const { error } = await actionSignUpUser(user)

    if (error) {
      form.reset()
      setSubmitError(error)
    } else {
      setConfirmation(true)
    }

    router.refresh()
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Full Name"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
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
              name="accepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Accept Terms and Conditions</FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full p-6"
              size="lg"
              disabled={isLoading}
            >
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

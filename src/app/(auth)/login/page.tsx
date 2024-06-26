"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitHandler } from "react-hook-form"
import googleImg from "../../../../public/google.png"
import logoImg from "../../../../public/cypresslogo.svg"
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
import Loader from "@/components/Loader"
import { Separator } from "@/components/ui/separator"
import { actionLoginUser } from "@/lib/serverActions"

export const LoginFormSchema = z.object({
  email: z.string().describe("Email").email({
    message: "Invalid Email",
  }),
  password: z.string().describe("Password").min(1, "Password is required"),
})

export default function LoginPage() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState("")

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = async (
    formData,
  ) => {
    const { error } = await actionLoginUser(formData)

    if (error) {
      form.reset()
      setSubmitError(error)
    }

    router.replace("/dashboard")
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("")
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-6 sm:w-[400px] sm:justify-center"
      >
        <Link href="/" className="justify-left flex w-full items-center">
          <Image src={logoImg} alt="Cypress Logo" width={50} height={50} />
          <span className="ml-2 text-4xl font-semibold dark:text-white">
            cypress.
          </span>
        </Link>
        <FormDescription className="text-foreground/60">
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
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
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className="self-center">
          Dont have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span>
        <Separator></Separator>
        <Button type="button" className="w-full" size="lg" variant="outline">
          <Image src={googleImg} alt="" className="mr-2 size-6" />
          Login with Google
        </Button>
      </form>
    </Form>
  )
}

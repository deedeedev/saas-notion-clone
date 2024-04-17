"use server"

import { supabaseServerClient } from "./supabase/server"
import { z } from "zod"
import { LoginFormSchema } from "@/app/(auth)/login/page"
import { SignUpFormSchema } from "@/app/(auth)/signup/page"

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof LoginFormSchema>) {
  const supabase = supabaseServerClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    if (!data.session) throw new Error("No session")

    return { error: null }
  } catch (error) {
    let errorMessage = "An error occurred"

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return { error: errorMessage }
  }
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof SignUpFormSchema>) {
  const supabase = supabaseServerClient()

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)

  if (data?.length) return { error: "User already exists" }

  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/callback",
      },
    })

    if (error) throw error
    if (!data.session) throw new Error("No session")

    return { error: null }
  } catch (error) {
    let errorMessage = "An error occurred"

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return { error: errorMessage }
  }
}

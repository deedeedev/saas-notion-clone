"use server"

import { supabaseServer } from "./supabase/server"
import { z } from "zod"
import { FormSchema } from "@/lib/types"

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = supabaseServer()
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return response
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = supabaseServer()

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)

  if (data?.length) return { error: { message: "User already exists" }, data }

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/callback",
    },
  })

  return response
}

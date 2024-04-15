"use server"

import { supabaseServer } from "./supabase/server"
import { z } from "zod"
import { LoginFormSchema } from "@/lib/types"

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof LoginFormSchema>) {
  const supabase = supabaseServer()
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return response
}

"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function registerEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "有効なメールアドレスを入力してください" };
  }

  const { error } = await supabase
    .from("pre_registrations")
    .insert({ email: email.trim().toLowerCase() });

  if (error) {
    if (error.code === "23505") {
      // unique violation
      return { success: false, error: "このメールアドレスはすでに登録済みです" };
    }
    return { success: false, error: "登録に失敗しました。もう一度お試しください" };
  }

  return { success: true };
}

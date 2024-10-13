"use server";

import { createClient } from "@/libs/supabase/server";
import { registerSchema, registerType } from "@/types/auth.types";

export async function registerAction(data: registerType) {
  const validatedData = registerSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      isError: true,
      message: "Invalid fields!",
    };
  }

  const { name, username, email, password } = validatedData.data;
  const supabase = createClient();
  const { data: usernameExist } = await supabase
    .from("user")
    .select()
    .eq("username", username)
    .single();
  if (usernameExist) {
    return {
      isError: true,
      message: "Username already in used!",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        username,
        email,
        avatar_url: `https://ui-avatars.com/api/?name=${username}`,
        bio: "no bio yet",
      },
    },
  });

  if (error) {
    return {
      isError: true,
      message: error.message,
    };
  }

  return {
    isError: false,
    message: "Registered successfully!",
  };
}

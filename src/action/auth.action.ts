"use server";

import { createClient } from "@/libs/supabase/server";
import {
  loginSchema,
  loginType,
  registerSchema,
  registerType,
} from "@/types/auth.types";
import { redirect } from "next/navigation";

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

export async function loginAction(data: loginType) {
  const validatedData = loginSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      isError: true,
      message: "Invalid fields!",
    };
  }

  const { email, password } = validatedData.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      isError: true,
      message: error.message,
    };
  }
  return {
    isError: false,
    message: "Welcome back!",
  };
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function getCurrentUserAction() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("user")
    .select(
      `
    name,
    username,
    email,
    avatar_url,
    bio
    `
    )
    .eq("id", user.id)
    .single();
  if (!data) {
    redirect("/login");
  }

  return data;
}

"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

interface CreatePostArgs {
  content: string;
  image: string | null;
}
export async function createPostAction({ content, image }: CreatePostArgs) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const { error } = await supabase.from("post").insert({
    content,
    image,
    user_id: user.id,
  });

  if (error) {
    return {
      isError: true,
      message: error.message,
    };
  }
  return {
    isError: false,
    message: "Posted successfully!",
  };
}

import { Metadata } from "next";
import { getCurrentUserAction } from "@/action/auth.action";
import { PostForm } from "@/components/post/post-form";

export const metadata: Metadata = {
  title: "Create",
};

export default async function CreatePage() {
  const { name, username, avatar_url } = await getCurrentUserAction();
  return (
    <main>
      <section className="flex items-center gap-2 mb-5">
        <div className="w-12 h-12">
          <img
            src={avatar_url}
            alt={username}
            className="w-full -h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold">{name}</h1>
          <p className="text-white/75 font-light">{username}</p>
        </div>
      </section>
      <PostForm />
    </main>
  );
}

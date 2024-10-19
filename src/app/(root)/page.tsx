import { getAllPostAction } from "@/action/post.action";
import { PostCard } from "@/components/post/post-card";

export default async function Page() {
  const posts = await getAllPostAction();
  return (
    <main className="flex flex-col items-center justify-center gap-3">
      <section className="flex flex-col gap-5">
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            name={post.user?.name as string}
            username={post.user?.username as string}
            avatar_url={post.user?.avatar_url as string}
            content={post.content}
            image={post.image}
            created_at={post.created_at}
          />
        ))}
      </section>
    </main>
  );
}

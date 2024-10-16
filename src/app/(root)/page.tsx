import { getAllPostAction } from "@/action/post.action";

export default async function Page() {
  const posts = await getAllPostAction();
  return (
    <main className="flex flex-col items-center justify-center gap-3">
      <section className="flex flex-col gap-5">
        {posts?.map((post) => (
          <div key={post.id}>
            <div className="flex items-center gap-2">
              <img
                src={post.user?.avatar_url}
                alt={post.user?.name}
                className="h-10 w-10 rounded-full "
              />
              <div>
                <h5 className="font-semibold">{post.user?.name}</h5>
                <p className="text-white/50 font-light -mt-1">
                  {post.user?.username}
                </p>
              </div>
            </div>
            <div className="ml-5 my-2 pl-7 py-5 border-l border-white/10">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.user?.username}
                  className="rounded-md mb-2"
                />
              ) : null}
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

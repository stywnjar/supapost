import { getCurrentUserAction } from "@/action/auth.action";
import { LogoutButton } from "@/components/auth";

export default async function Page() {
  const { name, username, avatar_url } = await getCurrentUserAction();
  return (
    <main className="flex flex-col items-center justify-center gap-3">
      <div>
        <img
          src={avatar_url}
          alt={username}
          className="w-40 h-40 rounded-full"
        />
      </div>
      <h1 className="font-bold text-3xl">{name}</h1>
      <p>{username}</p>
      <LogoutButton />
    </main>
  );
}

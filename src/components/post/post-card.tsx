"use client";

import { Heart, MessageSquare } from "lucide-react";
import { DateTime } from "luxon";

interface PostCardProps {
  avatar_url: string;
  username: string;
  name: string;
  image: string | null;
  content: string;
  created_at: string;
}
export function PostCard({
  avatar_url,
  name,
  username,
  image,
  content,
  created_at,
}: PostCardProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <img src={avatar_url} alt={name} className="h-10 w-10 rounded-full " />
        <div>
          <h5 className="font-semibold">{name}</h5>
          <p className="text-white/50 font-light -mt-1">{username}</p>
        </div>
      </div>
      <div className="ml-5 my-2 pl-7  border-l border-white/10">
        <div className="py-5">
          {image ? (
            <img src={image} alt={username} className="rounded-md mb-2" />
          ) : null}
          <p className="whitespace-pre-line">{content}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart />
            <MessageSquare />
          </div>
          <span className="font-light text-sm text-white/30">
            {DateTime.fromISO(created_at).toRelative()}
          </span>
        </div>
      </div>
    </div>
  );
}

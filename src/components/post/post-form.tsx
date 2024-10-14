"use client";
import { createPostAction } from "@/action/post.action";
import { createClient } from "@/libs/supabase/client";
import { Camera } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function PostForm() {
  const [imagePick, setImagePick] = useState<File | null>(null);
  const [isLoading, setTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function imagePickHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setImagePick(e.target.files[0]);
  }

  async function imageUpload(image: File) {
    const supabase = createClient();
    const { error } = await supabase.storage
      .from("supapost")
      .upload(`post/${image.name}`, image);
    if (error) {
      console.log(error);
    }
    const { data } = supabase.storage
      .from("supapost")
      .getPublicUrl(`post/${image.name}`);

    return data;
  }
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = String(formData.get("content"));

    if (content.length < 1) return toast.error("Cannot submit empty content!");
    setTransition(async () => {
      try {
        if (imagePick) {
          const imageUrl = await imageUpload(imagePick);
          const { isError, message } = await createPostAction({
            content,
            image: imageUrl.publicUrl,
          });
          if (isError) throw Error(message);
          toast.success(message);
          formRef.current?.reset();
          setImagePick(null);
          return;
        }
        const { isError, message } = await createPostAction({
          content,
          image: null,
        });
        if (isError) throw Error(message);
        toast.success(message);
        formRef.current?.reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  }

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <fieldset disabled={isLoading} className="flex flex-col gap-2">
        <textarea
          name="content"
          className="w-full p-4 h-48 rounded-md bg-transparent border border-white/10 resize-none outline-none"
        />
        {imagePick && (
          <section className="w-full">
            <div className="w-6/12 relative">
              <img
                src={URL.createObjectURL(imagePick)}
                alt="imagepick"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePick(null);
                }}
                className="absolute z-10 top-2 right-2 btn btn-sm btn-square "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </section>
        )}
        <div className="flex items-center justify-between">
          <input
            onChange={imagePickHandler}
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
          />
          <button
            type="button"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <Camera />
          </button>
          <button className="btn btn-outline btn-sm">
            {isLoading && <span className="loading loading-sm" />}Post
          </button>
        </div>
      </fieldset>
    </form>
  );
}

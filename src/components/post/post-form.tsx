"use client";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

export function PostForm() {
  const [imagePick, setImagePick] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function imagePickHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setImagePick(e.target.files[0]);
  }

  return (
    <form>
      <fieldset className="flex flex-col gap-2">
        <textarea
          required
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
          <button className="btn btn-outline btn-sm">Post</button>
        </div>
      </fieldset>
    </form>
  );
}

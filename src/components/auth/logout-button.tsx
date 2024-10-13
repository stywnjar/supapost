"use client";

import { useTransition } from "react";

export function LogoutButton() {
  const [isLoading, setTransition] = useTransition();

  function clickHandler() {
    setTransition(async () => {
      alert("hello world!");
    });
  }
  return (
    <button
      disabled={isLoading}
      onClick={clickHandler}
      className="btn-error btn btn-sm"
    >
      {isLoading && <span className="loading loading-sm" />}
      Log out
    </button>
  );
}

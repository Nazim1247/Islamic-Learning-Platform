'use client';
import { signIn } from "next-auth/react";

export default function GoogleLoginBtn() {
  return (
    <button
      onClick={() => signIn("google", {redirect: false, callbackUrl: "/" })}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-3"
    >
      Continue with Google
    </button>
  );
}

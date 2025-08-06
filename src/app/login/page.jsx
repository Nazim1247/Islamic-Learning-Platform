'use client';

import GoogleLoginBtn from "@/social/GoogleLoginBtn";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
        toast.success('login successfully!')
      router.push("/");
    } else {
        toast.error("Invalid email or password")
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 py-4">
      <div className="bg-color shadow p-6 rounded">
        <h2 className="text-3xl text-center text-orange-600 font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input mb-2 w-full bg-color shadow"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input mb-4 w-full bg-color shadow"
          />
          <button
            type="submit"
            className="btn border-none bg-orange-500 hover:bg-orange-600 text-white w-full rounded"
          >
            Login
          </button>
         <GoogleLoginBtn />
          <Link href="/register">
            <p className="mt-3 px-4 py-2 border-none text-center w-full rounded bg-gray-300">
              Are you new here?{" "}
              <span className="text-orange-600 hover:underline">Please Register</span>
            </p>
          </Link>

          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

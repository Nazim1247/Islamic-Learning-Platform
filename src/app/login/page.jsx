'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
        alert('login successfully!')
      router.push("/");
    } else {
        alert("Invalid email or password")
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 py-4">
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-3xl text-center text-orange-600 font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input mb-2 w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input mb-4 w-full"
          />
          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-600 text-white w-full rounded"
          >
            Login
          </button>

          <Link href="/register">
            <p className="mt-3 btn text-center w-full rounded">
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

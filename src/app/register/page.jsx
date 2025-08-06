"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleLoginBtn from "@/social/GoogleLoginBtn";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.target;
    const userInfo = {
      name: form.name.value,
      image: form.image.value,
      email: form.email.value,
      password: form.password.value,
      role: "student",
    };

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();

    if (res.ok) {
        toast.success("User registered successfully")
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
        toast.error("Registration failed!")
      setError(data.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 py-4">
    <div className="bg-color shadow p-6 rounded">
      <h2 className="text-3xl text-center text-orange-600 font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full mb-3"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />
        <button type="submit" className="btn border-none bg-orange-500 hover:bg-orange-600 text-white rounded w-full">
          Register
        </button>
        <GoogleLoginBtn />
        <Link href={'/login'}>
        <button className="mt-3 px-4 py-2 border-none text-center w-full rounded bg-gray-300">
            Have you already Account in This Page <span className="text-red-500 hover:underline">Please Login</span>
        </button>
        </Link> 

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-3 text-center">{success}</p>}
      </form>
      
    </div>
    </div>
  );
}

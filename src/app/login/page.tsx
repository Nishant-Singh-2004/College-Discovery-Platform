"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      router.push("/colleges");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="bg-black text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
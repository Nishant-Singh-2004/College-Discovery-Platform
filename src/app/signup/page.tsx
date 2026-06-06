"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      "/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      alert("Account created");

      router.push("/login");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Signup
        </h1>

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="bg-black text-white p-2 rounded w-full"
        >
          {loading
            ? "Creating..."
            : "Signup"}
        </button>
      </form>
    </div>
  );
}
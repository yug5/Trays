"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GridBackground from "../components/GridBackground";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validate = () => {
    if (!name) return "Name is required.";
    if (!email) return "Email is required.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return "Invalid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const contentType = res.headers.get("content-type");
    if (res.ok) {
      router.push("/signin");
    } else {
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data?.error === "Email already exists") {
          setError("Email already exists.");
        } else {
          setError(data?.error || "Something went wrong.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4  relative overflow-hidden">
      <GridBackground />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/70 via-gray-100/90 to-gray-200/80 opacity-90" />
      <form
        onSubmit={handleSignup}
        className="relative w-full max-w-md mx-auto bg-white/90 border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6 backdrop-blur"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <h1 className="text-4xl font-extrabold text-black text-center tracking-tight mb-2">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-6 font-mono">
          Join <span className="font-bold text-black">Trays</span>
        </p>
        <input
          placeholder="Name"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white font-mono"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white font-mono"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white font-mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        {error && (
          <div className="text-red-600 text-sm font-mono text-center -mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-gray-900 transition"
        >
          Sign up
        </button>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-black font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
        <div className="text-center text-gray-400 text-xs mt-4 font-mono">
          &copy; {new Date().getFullYear()} Trays
        </div>
      </form>
    </div>
  );
}

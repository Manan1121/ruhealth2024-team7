// src/app/signup/page.js
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here (e.g., API call)

    // Redirect to the Analysis page
    router.push("/analysis");
  };

  return (
<div
  className="flex items-center justify-center min-h-screen px-4 sm:px-0"
  style={{
    background: `radial-gradient(circle, rgba(173,216,230,1) 0%, rgba(210,210,210,1) 50%, rgba(0,0,139,1) 100%)`,
  }}
>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border-t-4 border-blue-600">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-800 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              className="block text-lg font-semibold text-blue-700 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              className="block text-lg font-semibold text-blue-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              className="block text-lg font-semibold text-blue-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition text-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

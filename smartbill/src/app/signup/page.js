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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Sign Up</h2>

      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-blue-200"
      >
        <div className="mb-4">
          <label
            className="block text-blue-700 font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-blue-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-blue-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Sign Up
        </button>
      </form>

      <Link href="/login" className="mt-4 text-blue-600 hover:underline">
        Already have an account? Log In
      </Link>
    </div>
  );
}

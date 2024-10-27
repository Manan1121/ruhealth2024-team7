// src/app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/analysis"); // Redirect to Analysis page on successful login
  };

  return (
    <div className="flex min-h-screen bg-blue-900 text-white">
      {/* Left Side: Title, Description, and Key Features */}
      <div className="flex flex-col items-start justify-center w-3/5 px-12">
        <div className="text-5xl font-extrabold mb-4">
          <h1>ClearBill</h1>
          <h2 className="mt-2 text-3xl text-blue-200">
            Healthcare billing can be foggy—ClearBill cuts through the haze.
          </h2>
        </div>
        <p className="text-lg max-w-lg mb-8 text-blue-200">
          ClearBill sheds light on medical bills, helping patients understand
          charges, streamlining hospital billing, and aiding fraud detection.
          Transparency in healthcare billing is just a click away.
        </p>
        <h2 className="text-xl font-semibold mb-6">Key Features</h2>

        {/* Feature Boxes with Subtle Zoom Animation */}
        <div className="space-y-6">
          <div className="bg-blue-700 text-white p-5 rounded-lg shadow-md transform animate-zoom-subtle delay-0">
            <p className="font-semibold">Patient-Centric Bill Summarization</p>
            <p className="mt-2">
              Translates complex billing codes into plain language so you know
              exactly what you’re being charged for.
            </p>
          </div>
          <div className="bg-blue-600 text-white p-5 rounded-lg shadow-md transform animate-zoom-subtle delay-500">
            <p className="font-semibold">Real-Time Error Detection</p>
            <p className="mt-2">
              Catches billing errors before they reach patients, reducing costly
              follow-ups.
            </p>
          </div>
          <div className="bg-blue-500 text-white p-5 rounded-lg shadow-md transform animate-zoom-subtle delay-1000">
            <p className="font-semibold">Fraud Prevention</p>
            <p className="mt-2">
              Alerts government agencies to unusual billing patterns,
              potentially saving billions.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center w-2/5 px-12">
        <div className="bg-white text-black shadow-lg rounded-lg p-8 w-full max-w-md border border-blue-300">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
            Log In
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-blue-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-blue-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4"
            >
              Log In
            </button>
          </form>

          {/* Subtle Sign Up Link */}
          <div className="text-center mt-4">
            <Link
              href="/signup"
              className="text-gray-400 underline hover:text-gray-300"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for Subtle Zoom Animation */}
      <style jsx>{`
        .animate-zoom-subtle {
          animation: zoomInOutSubtle 6s ease-in-out infinite;
        }

        .delay-0 {
          animation-delay: 0s;
        }

        .delay-500 {
          animation-delay: 2s;
        }

        .delay-1000 {
          animation-delay: 4s;
        }

        @keyframes zoomInOutSubtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02); /* More subtle zoom effect */
          }
        }
      `}</style>
    </div>
  );
}

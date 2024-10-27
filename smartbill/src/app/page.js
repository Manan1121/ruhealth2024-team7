// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/analysis");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
      {/* Left Side: Title, Description, and Features */}
      <div
        className={`flex flex-col items-start justify-center w-3/5 px-12 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <div className="text-5xl font-extrabold mb-4">
          <h1 className="font-poppins">ClearBill</h1>
          <h2 className="mt-2 text-3xl text-blue-200">
            Cutting through the haze of healthcare billing.
          </h2>
        </div>
        <p className="text-lg max-w-lg mb-8 text-blue-200">
          ClearBill simplifies complex medical bills, streamlines hospital
          billing, and helps prevent fraud—all at your fingertips.
        </p>
        <h2 className="text-xl font-semibold mb-6">Key Features</h2>

        <div className="space-y-6">
          {[
            {
              title: "Patient-Centric Bill Summarization",
              description:
                "Translates complex codes into plain language, so you know exactly what you're being charged for.",
            },
            {
              title: "Cost grade, see if youre being overcharged",
              description:
                "Identifies billing errors before they reach patients, minimizing costly corrections.",
            },
            {
              title: "Fraud Prevention",
              description:
                "Detects unusual billing patterns to alert agencies, saving billions.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-blue-${
                700 - index * 100
              } p-5 rounded-lg shadow-lg transform animate-pulse-slow transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } delay-${index * 1500}`}
            >
              <p className="font-semibold">{feature.title}</p>
              <p className="mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div
        className={`flex flex-col items-center justify-center w-2/5 px-12 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        } delay-4500`}
      >
        <div className="bg-white text-black shadow-2xl rounded-2xl p-8 w-full max-w-md border-t-4 border-blue-600">
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
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
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
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:scale-105 hover:shadow-xl transition transform"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              href="/signup"
              className="text-gray-500 underline hover:text-gray-300"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for Pulse Animation */}
      <style jsx>{`
        @keyframes pulseSlow {
          0% {
            transform: scale(1);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: scale(1.01);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        }

        .animate-pulse-slow {
          animation: pulseSlow 5s infinite;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-3000 {
          animation-delay: 3s;
        }

        .delay-4500 {
          animation-delay: 4.5s;
        }
      `}</style>
    </div>
  );
}

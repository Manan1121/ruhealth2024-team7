// src/app/page.js
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-blue-900">
      <h1 className="text-5xl font-extrabold mb-6 text-white">
        SmartBill: AI Powered Bill Analyzer
      </h1>
      <p className="text-xl max-w-2xl mb-10 text-blue-200">
        An AI-powered tool for detecting billing outliers, reducing errors,
        educating patients, and supporting Medicare fraud prevention.
      </p>

      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

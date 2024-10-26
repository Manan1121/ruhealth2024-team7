// src/app/components/FileUpload.js
"use client";
import { useState } from "react";

export default function FileUpload({ onAnalyze }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Mock analysis result
    onAnalyze("Analysis result will appear here after file processing...");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl flex flex-col items-center border border-blue-200">
      <label className="block mb-4 text-lg font-semibold text-blue-700">
        Upload Bill for Analysis
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-md w-full max-w-sm border-blue-300 focus:border-blue-500 focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
      >
        Upload & Analyze
      </button>
    </div>
  );
}

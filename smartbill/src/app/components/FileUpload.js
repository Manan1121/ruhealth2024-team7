// src/app/components/FileUpload.js
"use client";
import { useState } from "react";

export default function FileUpload({ onAnalyze }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !description) {
      alert("Please provide both a file and a description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      const response = await fetch("/api/analyzeJson", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      onAnalyze(result);
    } catch (error) {
      console.error("Error uploading file and description:", error);
      onAnalyze("Error: Unable to process the analysis.");
    }
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
      <textarea
        placeholder="Enter a description for the analysis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

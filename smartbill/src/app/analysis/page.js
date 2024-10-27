// src/app/analysis/page.js
"use client";

import { useState } from "react";
import FileUpload from "../components/FileUpload";

export default function Analysis() {
  const [output, setOutput] = useState(null);

  const handleAnalysis = (result) => {
    setOutput(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-200">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">
        ClearBill Analysis
      </h2>

      <FileUpload onAnalyze={handleAnalysis} />

      <div className="bg-blue-100 w-full max-w-2xl h-64 mt-6 p-4 rounded-lg shadow-lg flex items-center justify-center">
        {output ? (
          <pre className="text-blue-800">{JSON.stringify(output, null, 2)}</pre>
        ) : (
          <p className="text-blue-500">No results yet</p>
        )}
      </div>
    </div>
  );
}
